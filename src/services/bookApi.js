import axios from 'axios'

const ApiUrl = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyBbI3lL95nvzfZ6SV3IBQcKOJR2fVdH0sk&langRestrict=en&q='

export const searchBooks = async searchKeyword => {
  const { data: { items: books } } = await axios.get(`${ApiUrl}${searchKeyword}`)
  return books
}
