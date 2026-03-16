"use client";

import { BookFormInfo } from "@/types/FormInfo";
import css from "./BookForm.module.css";
import toast from "react-hot-toast";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

export default function BookForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleform = (formData: FormData) => {
    try {
      const bookInfo = Object.fromEntries(formData) as BookFormInfo;
      if (!bookInfo.email || !bookInfo.name || !bookInfo.date) {
        toast.error("Please fill all required fields.");
        return;
      }

      console.log(bookInfo);
      toast.success(
        `${bookInfo.name},your request has been sent. Our manager will contact you soon.`
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.log(error);
    } finally {
      setSelectedDate(null);
    }
  };

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
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
        />
        <input
          className={css.input}
          type="text"
          name="name"
          placeholder="Name*"
          minLength={3}
          required
        />

        <DatePicker
          name="date"
          placeholderText="Booking date"
          className={css.input}
          selected={selectedDate}
          onChange={handleChange}
          minDate={new Date()}
          dateFormat={"dd/MM/yyyy"}
          required
        />

        <textarea
          className={css.input}
          name="comment"
          placeholder="Comment"
          rows={3}
        ></textarea>
        <div className={css.btnBox}>
          <button type="submit" className={css.btn}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
