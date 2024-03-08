const Well = ({ onClick, wellData }) => {
  const wellClass = wellData ? "well well-active" : "well";
    
  return (
      <div className={wellClass} onClick={onClick}></div>
    );
  };
  
export default Well;