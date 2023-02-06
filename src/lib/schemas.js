import * as yup from 'yup';

export const loginUserSchema = yup.object().shape({
	email: yup.string().email('Email musí mať platnú formu.').required('Email je povinný'),
	password: yup.string().min(8, 'Heslo musí mať min. 8 znakov.').required('Heslo je povinné')
});

export const resetPasswordSchema = yup.object().shape({
	email: yup.string().email('Email musí mať platnú formu.').required('Email je povinný')
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

export const companySchema = yup.object().shape({
	name: yup.string().required('Povinný údaj'),
	email: yup.string().email('Email musí mať platnú formu.').required('Email je povinný'),
	person: yup.string().required('Povinný údaj'),
	phone: yup
		.string()
		.matches(/^(\+421|0) ?\d{3} ?\d{3} ?\d{3}$/, 'Zlý formát telefónneho čísla')
		.required('Povinný údaj'),
	address: yup.string().required('Povinný údaj'),
	postcode: yup
		.string()
		.matches(/^\d{3} ?\d{2}$/, 'Formát PSČ je "12345" alebo "123 45"')
		.required('Povinný údaj'),
	city: yup.string().required('Povinný údaj'),
	country: yup.string().required('Povinný údaj'),
	ico: yup.string().required('Povinný údaj'),
	dic: yup.string().required('Povinný údaj'),
	iban: yup
		.string()
		.matches(
			/^SK[0-9]{2} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4}?$/,
			'Nesprávny formát IBAN'
		)
		.required('Povinný údaj'),
	swift: yup.string().required('Povinný údaj'),
	signature: yup.mixed().when('check_signature', {
		is: 'on',
		then: yup.mixed().required('Podpis je povinný')
	})
});

export const customerSchema = yup.object().shape({
	name: yup.string().required('Povinný údaj'),
	email: yup.string().email('Email musí mať platnú formu.').required('Email je povinný'),
	address: yup.string().required('Povinný údaj'),
	postcode: yup
		.string()
		.matches(/^\d{3} ?\d{2}$/, 'Formát PSČ je "12345" alebo "123 45"')
		.required('Povinný údaj'),
	city: yup.string().required('Povinný údaj'),
	country: yup.string().required('Povinný údaj'),
	ico: yup.string().required('Povinný údaj'),
	dic: yup.string().required('Povinný údaj')
});

const repeaterSchema = yup.object().shape({
	title: yup.string().required('Povinný údaj'),
	count: yup.number('Musí byť číslo').positive('Musí byť väčšie ako 0').required('Povinný údaj'),
	per_price: yup
		.number('Musí byť číslo')
		.positive('Musí byť väčšie ako 0')
		.required('Povinný údaj'),
	price: yup.number('Musí byť číslo').positive('Musí byť väčšie ako 0').required('Povinný údaj')
});
export const invoiceSchema = yup.object().shape({
	customerId: yup.string().required('Povinný údaj'),
	date: yup.date().typeError('Dátum vystavenia je povinný.').required('Povinný údaj'),
	date_payment: yup.date().typeError('Dátum splatnosti je povinný.').required('Povinný údaj'),
	variable_symbol: yup.string().required('Povinný údaj'),
	items: yup.array().of(repeaterSchema)
});
