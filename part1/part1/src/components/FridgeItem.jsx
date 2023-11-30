import apple from '../assets/apple.svg'
import milk from '../assets/milk.svg'
import eggs from '../assets/eggs.svg'

const FridgeItem = ({ name }) => {
    /**
     * create function that returns image that you import with import
     * 
     * given name, return the name's image
     */

    /**
     * switch statement to return the correct image
     */
    switch (name) {
        case 'apple':
            return <img src={apple} className= { name } alt = { name }/>
        case 'milk':
            return <img src={milk} className= { name } alt = { name }/>
        case 'eggs':
            return <img src={eggs} className= { name } alt = { name }/>
        default:
            return <img src={name} className= { name } alt = { name }/>
    }
}

export default FridgeItem;