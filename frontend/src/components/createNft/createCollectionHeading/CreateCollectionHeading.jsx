import "./createCollectionHeading.css";

const CreateCollectionHeading = () => {
  return (
    <div className="createCollectionHeadingAndDescriptionContainer">
      <div className="createCollectionHeadingContainer">
        <h1 className="createCollectionHeading">Create new collection</h1>
      </div>
      <div className="createCollectionDescriptionContainer">
        <p className="createCollectionDescription">
          Create a collection that you can list on any marketplace, including
          OpenSea. Start by adding collection details.
        </p>
      </div>
    </div>
  );
};

export default CreateCollectionHeading;
