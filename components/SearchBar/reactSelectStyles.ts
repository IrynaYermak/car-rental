export const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    alignContent: "center",
    backgroundColor: "var(--inputs)",
    border: "none",
    borderRadius: "12px",
    padding: "8px 12px",
    height: "44px",
    width: "204px",
    boxShadow: "none",
    fontSize: "16px",
    FontFace: "var(--font-manrope-sans)",
    " @media screen and (min-width: 1440px)": {
      padding: "12px 16px",
    },
  }),

  placeholder: (base: any) => ({
    ...base,
    color: "var(--black)",
    fontSize: "16px",
    lineHeight: "1.25",
  }),

  singleValue: (base: any) => ({
    ...base,
    color: "var(--black)",
    fontSize: "16px",
  }),

  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#000",
    paddingRight: "8px",
    "&:hover": { color: "#000" },
  }),

  menu: (base: any) => ({
    ...base,
    borderRadius: "12px",
    border: "1px solid var(--inputs)",
    marginTop: "4px",
    paddingRight: "8px",
    paddingTop: "12px",
    paddingBottom: "14px",
    backgroundColor: "#FFF",
    boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
  }),

  menuList: (base: any) => ({
    ...base,
    padding: 0,
    borderRadius: "12px",
    maxHeight: "204px",
  }),

  option: (base: any, state: any) => ({
    ...base,
    gap: "8px",
    // padding: "12px 16px",
    fontSize: "16px",
    backgroundColor: "var(--white)",
    "&:hover": { backgroundColor: "transparent" },
    color: state.isSelected ? "var(--black)" : " var(--gray)",
    cursor: "pointer",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),
};
