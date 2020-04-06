import axios from 'axios'
const config = require('../config/config.json')
const apiUrl = config.API_URL

export const list = async () => {
	try {
		const listProperties = await axios.get(`${apiUrl}/properties`)
		return listProperties.data
	} catch (err) {
		return {
			success: false,
			data: err.message
		}
	}
}
export const show = async (id) => {
	try {
		const showProperty = await axios.get(`${apiUrl}/properties/${id}`)
		return showProperty.data
	} catch (err) {
		return {
			success: false,
			data: err.message
		}
	}
}
export const create = async (data) => {
	try {

		let formData = new FormData();
		Object.keys(data).forEach(d => {
			let value = data[d]
			if (!value || value == null || value == undefined) {
				value = ''
			}
			formData.append(d, value)
		})
		const createProperty = await axios.post(`${apiUrl}/properties`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return createProperty.data
	} catch (err) {
		return {
			success: false,
			data: err.message
		}
	}
}
export const update = async (id, data) => {
	try {
		let formData = new FormData();
		Object.keys(data).forEach(d => {
			let value = data[d]
			if (!value || value == null || value == undefined) {
				value = ''
			}
			formData.append(d, value)
		})
		const updateProperty = await axios.put(`${apiUrl}/properties/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return updateProperty.data
	} catch (err) {
		return {
			success: false,
			data: err.message
		}
	}
}
export const remove = async (id) => {
	try {
		const removeProperty = await axios.delete(`${apiUrl}/properties/${id}`)
		return removeProperty.data
	} catch (err) {
		return {
			success: false,
			data: err.message
		}
	}
}