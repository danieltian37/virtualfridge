import milk from '.././assets/milk.svg'

function AddMilk () {
    console.log("success")

    return (
        <a target="_blank">
            <img src={milk} className="milk" alt="milk" />
        </a>
    );
}


export default AddMilk;