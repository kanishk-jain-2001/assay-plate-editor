const Well = ({ onClick, wellData }) => {
    return (
      <div className="well" onClick={onClick}>
        {/* Display well data */}
        {wellData && (
          <div>
            <div>Reagent: {wellData.reagent}</div>
            <div>Antibody: {wellData.antibody}</div>
            <div>Concentration: {wellData.concentration}</div>
          </div>
        )}
      </div>
    );
  };
  
export default Well;