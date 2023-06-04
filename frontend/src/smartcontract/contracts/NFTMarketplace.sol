// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.015 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        address payable creator;
        address payable royaltyRecipient;
        uint royalty;
        uint256 royaltyAmount;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        address payable creator,
        address payable royaltyRecipient,
        uint256 royalty,
        uint256 royaltyAmount
    );

    event buyEvent(
        uint256 tokenId,
        address seller,
        address owner
    );

    event resellEvent(
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the marketplace can change the listing price"
        );
        _;
    }

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice)
        public
        payable
        onlyOwner
    {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    function getContractBalance() public  view onlyOwner returns (uint256){
        return address(this).balance;
    } 

    function withdrawn() public onlyOwner returns(bool){
        address payable to = payable(msg.sender);
        to.transfer(address(this).balance);
        return true;
    }

    
    function withdrawnRoyalty(uint256 tokenId) public payable returns(bool) {
        require(msg.sender == idToMarketItem[tokenId].royaltyRecipient,"only royalty recipient can withdraw amount");
        address payable to = idToMarketItem[tokenId].royaltyRecipient;
        uint256 amount = idToMarketItem[tokenId].royaltyAmount;
        idToMarketItem[tokenId].royaltyAmount = 0;
        to.transfer(amount);
        return true;
    }

    function getRoyaltyAmountOfRecipient(uint256 tokenId) public view returns(uint256){
        return idToMarketItem[tokenId].royaltyAmount;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price,uint256 royalty,address payable  royaltyRecipient)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price,royalty,royaltyRecipient);
        return newTokenId;
    }

    function deleteNft(uint256 tokenId) public {
        require(msg.sender == idToMarketItem[tokenId].owner);
        delete idToMarketItem[tokenId];
    }

    function createMarketItem(uint256 tokenId, uint256 price,uint256 royalty,address payable royaltyRecipient) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            payable(msg.sender),
            payable(royaltyRecipient),
            royalty,
            0
        );

        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false,
            payable(msg.sender),
            payable(royaltyRecipient),
            royalty,
            0
        );
    }


    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
        emit resellEvent(tokenId,msg.sender, address(this), price);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        address  to = idToMarketItem[tokenId].seller;

        uint256 royaltyPr = idToMarketItem[tokenId].royalty;
        uint256 royaltyAmount = (royaltyPr * price)/100  ;
            
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        idToMarketItem[tokenId].royaltyAmount += royaltyAmount;

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(to).transfer(price - royaltyAmount);

        emit buyEvent(tokenId,address(0),msg.sender);
    }

    // function fetchMarketItems() public view returns (MarketItem[] memory) {
    //     uint256 itemCount = _tokenIds.current();
    //     uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
    //     uint256 currentIndex = 0;

    //     MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    //     for (uint256 i = 0; i < itemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == address(this)) {
    //             uint256 currentId = i + 1;
    //             MarketItem memory currentItem = idToMarketItem[currentId];
    //             items[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return items;
    // }

    // function fetchMyNFTs() public view returns (MarketItem[] memory) {
    //     uint256 totalItemCount = _tokenIds.current();
    //     uint256 itemCount = 0;
    //     uint256 currentIndex = 0;

    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == msg.sender) {
    //             itemCount += 1;
    //         }
    //     }

    //     MarketItem[] memory items = new MarketItem[](itemCount);
    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].owner == msg.sender) {
    //             uint256 currentId = i + 1;
    //             MarketItem memory currentItem = idToMarketItem[currentId];
    //             items[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return items;
    // }

    // function fetchSingleNft(uint256 tokenId) public view returns( MarketItem memory) {
    //     return idToMarketItem[tokenId];
    // }

    /* Returns only items a user has listed */
    // function fetchItemsListed() public view returns (MarketItem[] memory) {
    //     uint256 totalItemCount = _tokenIds.current();
    //     uint256 itemCount = 0;
    //     uint256 currentIndex = 0;

    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].seller == msg.sender) {
    //             itemCount += 1;
    //         }
    //     }

    //     MarketItem[] memory items = new MarketItem[](itemCount);
    //     for (uint256 i = 0; i < totalItemCount; i++) {
    //         if (idToMarketItem[i + 1].seller == msg.sender) {
    //             uint256 currentId = i + 1;
    //             MarketItem memory currentItem = idToMarketItem[currentId];
    //             items[currentIndex] = currentItem;
    //             currentIndex += 1;
    //         }
    //     }
    //     return items;
    // }
}