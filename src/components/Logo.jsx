const Logo = ({ width, height, textSize }) => {
  return (
    <div
      className={` ${width} ${height} my-1 btn btn-secondary rounded-xl font-bold  hover:cursor-pointer text-gray-600 ${textSize}`}
    >
      NotesSphere
    </div>
  );
};
export default Logo;
