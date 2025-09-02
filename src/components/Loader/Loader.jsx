import { GridLoader } from "react-spinners";

export default function Loader() {
    return (
        <p className='loader'><GridLoader size={10} color={"#9b6c43"} /></p>
    )
}