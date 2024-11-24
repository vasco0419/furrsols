import api from "../../../../configs/api"
import { toast } from 'react-toastify'

export const getFurrsols = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/fetchFurrsols", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                // toast.success('get furrsols', { theme: 'dark' })
                dispatch({ type: 'GET_FURRSOLS', furrsols: result.data })
            } else {
                toast.warn(result.message, { theme: 'dark' })
            }
        }).catch(e => {
            console.log('Fetch Furrsols Failed', e)
            toast.error('Fetch Furrsols Failed', { theme: 'dark' })
        })
        return response
    }
}

export const takecare = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/takecare", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({ type: 'TAKECARE_FURRSOL', furrsol: result.data.furrsol })
                dispatch({ type: 'FETCH_WALLET', wallet: result.data.wallet })
            } else {
                // dispatch({ type: 'TAKECARE_FAILED', value: 2, message: result.message })
                toast.warn(result.message, { theme: 'dark' })
            }
        }).catch(e => {
            console.log('Takecare Failed', e)
            toast.error('Takecare Failed', { theme: 'dark' })
        })
        return response
    }
}

export const spawn = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/spawn", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({ type: 'SPAWN_FURRSOL', furrsol: result.data })
                toast.success("Spawn success", { theme: 'dark' })
            } else {
                toast.warn(result.message, { theme: 'dark' })
            }
            dispatch({ type: 'SET_LOADING', loading: false })

        }).catch(e => {
            console.log('Spawn Failed', e)
            toast.error('Spawn Failed', { theme: 'dark' })
            dispatch({ type: 'SET_LOADING', loading: false })
        })
        return response
    }
}

export const despawn = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/despawn", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({ type: 'DESPAWN_FURRSOL', furrsol: result.data })
                toast.success('Despawn Success', { theme: 'dark' })
            } else {
                toast.warn(result.message, { theme: 'dark' })
            }
            dispatch({ type: 'SET_LOADING', loading: false })

        }).catch(e => {
            console.log('Despawn Failed', e)
            toast.error('Despawn Failed', { theme: 'dark' })
            dispatch({ type: 'SET_LOADING', loading: false })

        })
        return response
    }
}

export const revive = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/revive", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({ type: 'REVIVE_FURRSOL', furrsol: result.data.furrsol })
                dispatch({ type: 'FETCH_WALLET', wallet: result.data.wallet })
                toast.success(result.message, { theme: 'dark' })
            } else {
                toast.warn(result.message, { theme: 'dark' })
            }
        }).catch(e => {
            console.log('Revive Failed', e)
            toast.error('Revive Failed', { theme: 'dark' })
        })
        return response
    }
}

export const collect = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/collect", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({ type: 'COLLECT_FLUFF', furrsol: result.data.furrsol })
                dispatch({ type: 'FETCH_WALLET', wallet: result.data.wallet })
                toast.success(result.message, { theme: 'dark' })
            } else {
                toast.warn(result.message, { theme: 'dark' })
            }
        }).catch(e => {
            console.log('Collect Failed', e)
            toast.error('Collect Failed', { theme: 'dark' })
        })
        return response
    }
}

export const upgrade = (params: any) => {
    return async (dispatch: any) => {
        const response = await api.post("/furrsol/upgrade", {
            params
        }).then(response => {
            const result = response.data
            if (result.success === true) {
                dispatch({ type: 'UPGRADE_FURRSOL', furrsol: result.data.furrsol })
                dispatch({ type: 'FETCH_WALLET', wallet: result.data.wallet })
                toast.success(result.message, { theme: 'dark' })
            } else {
                toast.warn(result.message, { theme: 'dark' })
            }
        }).catch(e => {
            console.log('Upgrade Failed', e)
            toast.error('Upgrade Failed', { theme: 'dark' })
        })
        return response
    }
}

export const getCurrentSeason = () => async (dispatch: any) => {
    const response = await api.post("/furrsol/getseason").then((response: any) => {
        const result = response.data
        if (result.success === true) {
            dispatch({
                type: 'GET_SEASON', season: result.data.value
            })
            // toast.success(result.message, {theme: 'dark'})
        } else {
            toast.warn(result.message, { theme: 'dark' })
        }
    }).catch((e: any) => {
        console.log("Get season Failed", e)
        toast.error("Get season Failed", { theme: 'dark' })
    })
    return response

}
