export const convertDate = (date) => {
  const d = new Date(parseInt(date));
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  const dateNumeric = `${mo} ${da}, ${ye}`;

  return dateNumeric;
};
