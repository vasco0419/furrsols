import api from "../../configs/api"
import { toast } from 'react-toastify'
export const claim = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/claim", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({
                    type: 'CLAIM_FLUFF',
                    fluff: result.data.fluff
                })
                toast.success('Claim success', { theme: 'dark' })
            }
        }).catch((e: any) => {
            toast.error(e.message, { theme: 'dark' })
        })
        return response
    }
}

export const fetchWallet = (params: any) => {

    return async (dispatch: any) => {
        console.log("wallet ", params)
        const response = await api.post("/wallet/fetchWallet", {
            params
        }).then(response => {
            const result = response.data
            console.log("result: ", result)
            if (result.success === true) {
                dispatch({
                    type: 'FETCH_WALLET',
                    wallet: result.data
                })
            }
        }).catch((err: any) => {
            console.log("error: ", err.message)
        })
        console.log("response: ", response)
        return response
    }
}

export const deposit = (params: any) => async (dispatch: any) => {
    const response = await api.post("/furrsol/deposit", {
        params
    }).then(response => {
        const result = response.data
        if (result.success) {
            dispatch({
                type: 'DEPOSIT_FLUFF',
                fluff: result.data.fluff
            })
            toast.success('Deposit success', { theme: 'dark' })
        }
    }).catch((e: any) => {
        toast.error(e.message, { theme: 'dark' })
    })
    return response
}
