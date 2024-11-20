const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US',{
        style : "currency",
        currency : 'EGP',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displayINRCurrency