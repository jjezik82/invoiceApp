export async function getTemplate(data, image) {
	const itemObjects = data.form.invoice.items;
	const items = itemObjects
		.map(
			(i) =>
				`<div class="table-body">
            <p>${i.title}</p>
            <p>${i.count}</p>
            <p>${i.per_price} €</p>
            <p>${i.price} €</p>
          </div>`
		)
		.join('');
	return `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        -webkit-print-color-adjust: exact;
        }
      .mb-3 {
        margin-bottom: 0.75rem/* 12px */;
      }
      .bg-gray-50 {
        --tw-bg-opacity: 1;
        background-color: rgb(249 250 251 / var(--tw-bg-opacity));
      }
      .bordered{
        border: 1px solid black;
      }
      .rounded {
        border-radius: 0.5rem;
      }
      .shadow {
        --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
      }
      .separator{
        margin: 0 2rem;
        height: 2px;
        background-color: #222222;
      }
      .header{
        margin: 2rem 2rem 1rem 0;
        background-color: #222222;
        color: #ffffff;
        font-size:1rem;
        font-weight: bold;
        padding:1rem 2rem;
        border-top-right-radius:0.5rem;
        border-bottom-right-radius:0.5rem;
      }
      .company-data{
        margin: 0 2rem 1rem 2rem;
        display: flex;
      }
      .company{
        padding: 2rem 2rem 0 2rem;
        flex: 1 1 auto;
      }
      .dates{
        margin: 0 2rem;
        display: flex;
      }
      .date{
        padding: 1rem;
        flex: 1 1 auto;
      }
      .date span{
        font-weight: bold;
      }
      .payment-info{
        margin: 0 2rem;
      }
      .payment-header{
        display: flex;
        padding: 1rem;
      }
      .payment-cell{
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
      }
      .payment-choice{
        margin: 1rem 2rem;
      }
      .items{
        margin: 1rem 2rem;
        overflow: hidden;
      }
      .table-head{
        display: flex;
        background-color:#222222;
        color: #ffffff;
      }
      .table-head p{
        flex: 1 1 15%;
        padding: 0.2rem 1rem;
        text-align: center;
        font-weight: bold;
      }
      .table-head p:first-child{
        flex: 1 1 55%;
        text-align: left;
      }
      .table-body{
        display: flex;
      }
      .table-body p{
        flex: 1 1 15%;
        padding: 0.2rem 1rem;
        text-align: center;
      }
      .table-body p:first-child{
        flex: 1 1 55%;
        text-align: left;
      }
      .total-price{
        margin: 0 2rem;
        padding: 0 1rem;
        text-align: right;
        font-size:15px;
      }
      .total-price span{
        font-size:20px;
        font-weight:bold;
      }
      .signature{
        margin: 1rem 2rem;
        padding: 0 2rem;
        display: flex;
        justify-content: end;
      }
      .image-container{
        min-height: 100px;
        flex: 0 0 35%;
      }
      .image-container p{
        border-top: 1px solid black;
        text-align: center;
        font-size:12px;
      }
      .image-container img{
        height: auto;
        width:100%;
      }
      .footer{
        position: absolute;
        bottom: 15px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #D3D3D3;
      }
    </style>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>test</title>
      </head>
      <body>
        <div class="header shadow">
          <p>Faktúra ${data.form.invoice.vs}</p>
        </div>
        <div class="company-data">
          <div class="company">
            <h4>Dodávateľ</h4>
            <p>${data.company.name}</p>
						<p>${data.company.address}</p>
						<p class="mb-3">${data.company.postcode} ${data.company.city}</p>
						<p>${data.company.country}</p>
						<p>IČO: ${data.company.ico}</p>
						<p>DIČ: ${data.company.dic}</p>
						<p class="mb-3">${
							data.company.ic_dph ? 'IČ DPH: ' + data.company.ic_dph : 'Nie je platiteľ DPH'
						}</p>
						<p>${data.company.phone}</p>
						<p>${data.company.email}</p>
						<p>${data.company.person}</p>
          </div>
          <div class="company rounded shadow bg-gray-50" style="margin-right:2rem;">
            <h4>Odberateľ</h4>
            <p>${data.customer.name}</p>
						<p>${data.customer.address}</p>
						<p>${data.customer.postcode} ${data.customer.city}</p>
						<p class="mb-3">${data.customer.country}</p>
						<p>IČO: ${data.customer.ico}</p>
						<p>DIČ: ${data.customer.dic}</p>
						<p>${data.customer.ic_dph ? 'IČ DPH: ' + data.customer.ic_dph : 'Nie je platiteľ DPH'}</p>
          </div>
        </div>
        <div class="separator"></div>
        <div class="dates">
          <div class="date">Dátum vystavenia: <span>${new Date(
						data.form.invoice.date_now
					).toLocaleDateString('sk-SK')}</span></div>
          <div class="date">Dátum dodania: <span>${new Date(
						data.form.invoice.date_now
					).toLocaleDateString('sk-SK')}</span></div>
          <div class="date">Dátum splatnosti: <span>${new Date(
						data.form.invoice.date_payment
					).toLocaleDateString('sk-SK')}</span></div>
        </div>
        <div class="payment-info rounded shadow bg-gray-50">
          <div class="payment-header">
            <div class="payment-cell">
              <p>IBAN</p>
              <p style="font-weight:bold;">${data.company.iban}</p>
            </div>
            <div class="payment-cell" style="text-align:center">
              <p>SWIFT</p>
              <p style="font-weight:bold;">${data.company.swift}</p>
            </div>
            <div class="payment-cell" style="text-align:center">
              <p>VS</p>
              <p style="font-weight:bold;">${data.form.invoice.vs}</p>
            </div>
            <div class="payment-cell" style="text-align:center">
              <p>SUMA NA ÚHRADU</p>
              <p style="font-weight:bold; font-size:20px;">${data.form.invoice.total_price} €</p>
            </div>
          </div>
        </div>
        <div class="payment-choice">
          <p>Spôsob úhrady: <span style="font-weight:bold;">Bankový prevod</span></p>
        </div>
        <div class="items bg-gray-50 rounded shadow">
          <div class="table-head">
            <p>Názov položky</p>
            <p>Počet</p>
            <p>Jedn.cena</p>
            <p>Cena spolu</p>
          </div>
          ${items}
        </div>
        <div class="total-price">
          <p>Celkom: <span>${data.form.invoice.total_price} €</span></p>
        </div>
        <div class="signature">
          <div class="image-container">
            <img src="data:image/png;base64,${image}" alt="pečiatka" />
            <p>Pečiatka a podpis</p>
          </div>
        </div>
        <div class="footer">
          <p>Spoločnosť je zapísaná v Živnostenskom registri Okresného úradu Zvolen, registrácia č. 670-31125</p>
        </div>
      </body>
    </html>
  `;
}
