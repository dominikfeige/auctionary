import axios from 'axios'
import {
  AUCTION_RANDOM_REQUEST,
  AUCTION_RANDOM_SUCCESS,
  AUCTION_RANDOM_FAIL,
} from '../constants/auctionConstants'

export const listRandomAuction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUCTION_RANDOM_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/auctions/randomAuction`, config)

    dispatch({
      type: AUCTION_RANDOM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AUCTION_RANDOM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}