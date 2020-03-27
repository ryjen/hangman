import Payload from "types/Payload"

type Action<ValueType> = {
    type: string,
    payload: Payload<ValueType>
}

export default Action
