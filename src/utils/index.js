exports.countTotal = (items) => {
    let total = 0;
    items.forEach((item => {
        const totalItem = item.qty * item.item.dataValues.price
        total += totalItem
    }))

    return total
}