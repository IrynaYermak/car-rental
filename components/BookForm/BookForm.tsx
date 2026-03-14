import css from "./BookForm.module.css";

export default function BookForm() {
  const handleform = (formData: FormData) => {};
  return (
    <div className={css.formBox}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.text}>
        Stay connected! We are always ready to help you.
      </p>
      <form action={handleform} className={css.form}>
        <input
          className={css.input}
          type="emeil"
          name="email"
          placeholder="Email*"
        />
        <input
          className={css.input}
          type="text"
          name="name"
          placeholder="Name*"
        />
        <input
          className={css.input}
          type="date"
          name="date"
          placeholder="Booking date"
        />
        <textarea
          className={css.input}
          name="comment"
          placeholder="Comment"
          id=""
        ></textarea>
        <button type="submit" className={css.btn}>
          Send
        </button>
      </form>
    </div>
  );
}
