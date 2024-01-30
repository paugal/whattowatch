const MyButtonLink = ({ to }) => {
 
    return (
        <a href={`/${to}`}>
            {to === '' ? "home" : to}
            
        </a>
    )
}
 
export default MyButtonLink;