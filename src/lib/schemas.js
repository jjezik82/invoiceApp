import * as yup from 'yup';

export const loginUserSchema = yup.object().shape({
	email: yup.string().email('Email musí mať platnú formu.').required('Email je povinný'),
	password: yup.string().min(8, 'Heslo musí mať min. 8 znakov.').required('Heslo je povinné')
});
export const registerUserSchema = yup.object().shape({
	name: yup.string().min(2, 'Meno musí mať min. 2 znaky.').required('Meno je povinné'),
	email: yup.string().email('Email musí mať platnú formu.').required('Email je povinný'),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'Heslo musí mať min. 8 znakov a musí obsahovať aspoň jedno číslo a jedno písmeno.'
		)
		.required('Heslo je povinné'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Heslá sa musia zhodovať')
		.required('Heslo je povinné')
});
