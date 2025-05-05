
const VerticalSeparators = () => {
  return (
    <>
      {/* Left side separators */}
      <div className="absolute top-10 bottom-10 left-[180px] border-l-2 border-dashed border-slate-400"></div>
      
      {/* Right side separators */}
      <div className="absolute top-10 bottom-10 right-[200px] border-l-2 border-dashed border-slate-400"></div>
      <div className="absolute top-10 bottom-10 right-[140px] border-l-2 border-dashed border-slate-400"></div>
    </>
  );
};

export default VerticalSeparators;
