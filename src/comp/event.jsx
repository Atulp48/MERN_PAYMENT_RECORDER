import react, { useContext } from "react"
import { Context, server } from '../main'
import toast from "react-hot-toast";
import axios from "axios";


const Event = ({ items }) => {
    const { _id, title, description, isCompleted } = items;
    const { setRefresh } = useContext(Context)


    const updt = async (id) => {
        try {

            const { data } = await axios.put(`${server}/task/${id}`, {}, { withCredentials: true })

            toast.success(data.message)
            setRefresh((opp) => !opp)

        } catch (error) {
            toast.error("please try agian")
        }
    }
    const dlt = async (id) => {
        try {

            const { data } = await axios.delete(`${server}/task/${id}`, { withCredentials: true })

            toast.success(data.message)
            setRefresh((opp) => !opp)

        } catch (error) {
            toast.error("please try agian")
        }
    }


    return (
        <div className="todo">

            <div>
                <h4>
                    {title}
                </h4>
                <p>
                    {description}
                </p>
            </div>
            <div>
                <input onChange={() => updt(_id)} type="checkbox" checked={isCompleted} />
                <button onClick={() => dlt(_id)} className="btn">REMOVE</button>
            </div>

        </div>


    )
}

export default Event;