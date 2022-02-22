export const formatCurrency = (amount: number, currency = "USD") => {
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  });

  return formater.format(amount);
};
