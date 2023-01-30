// import  {crypto}  from 'crypto';

export const serializeNonPOJOs = (obj) => {
	return structuredClone(obj);
};

// export const generateUsername = async(name) => {
// 	const id = await crypto.randomBytes(2).toString('hex');
// 	return `${name.slice(0, 5)}${id}`;
// };

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `https://backend.jjezik.site/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const getPDFURL = (collectionId, recordId, fileName) => {
	return `https://backend.jjezik.site/api/files/${collectionId}/${recordId}/${fileName}`;
};

export const createVariableSymbol = (year, num) => {
	const n = String(num).padStart(4, '0');
	const y = String(year);
	return y + n;
};

export const validateData = async (formData, schema) => {
	const body = Object.fromEntries(formData);
	try {
		const data = await schema.validate(body, { abortEarly: false });
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		// console.log('Error:', err);
		const errors = err.inner.reduce((acc, err) => {
			return { ...acc, [err.path]: err.message };
		}, {});
		return {
			formData: body,
			errors
		};
	}
};
