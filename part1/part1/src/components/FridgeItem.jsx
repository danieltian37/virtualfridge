
const FridgeItem = ({ name }) => {
    
    return (
        <img src={'src/assets/' + name + '.svg'} className= { name } alt = { name }/>
    )
}

export default FridgeItem;