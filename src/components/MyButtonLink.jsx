const MyButtonLink = ({ to }) => {
  return <link to={`/${to}`}>{to === "" ? "home" : to}</link>;
};

export default MyButtonLink;
