import styles from "./style.module.css";

interface AlternativeProps {
  label: string;
  order: number;
}

export function Alternative(props: AlternativeProps) {
  const id = `alternative-${props.order}`;
  return (
    <>
      <input
        tabIndex={-1}
        type="radio"
        id={`alternative-${props.order}`}
        name="alternative"
        defaultValue={props.order}
        className={styles.input}
      />
      <label htmlFor={id} className={styles.component} tabIndex={0}>
        {props.label}
      </label>
    </>
  );
}