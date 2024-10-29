import cardStyles from "./card.module.css";

interface CardProps {
  headerTitle: string;
  children: React.ReactNode;
}
export function Card(props) {
  return (
    < div className={cardStyles.card} >
      <header className={cardStyles.cardHeader}>
        <h1 className={cardStyles.cardTitle}>{props.headerTitle}</h1>
      </header>
      <section className={cardStyles.cardBody}>
        {props.children}
      </section>
    </div >
  );
}