interface FormTitleProps {
  textContent: string;
}

export default function FormTitle({ textContent }: FormTitleProps) {
  return <h1 className="font-semibold">{textContent}</h1>;
}
