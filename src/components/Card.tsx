import React from "react";
import styles from "./Card.module.css";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Card = ({ title, children }: Props) => {
  return (
    <div className={styles.card}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
