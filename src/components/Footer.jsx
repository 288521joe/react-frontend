import FooterButton from "./FooterButton";

export default function Footer({ onModel, onCapability, onResult }) {
  return (
    <div className="bg-white py-4 border-t flex justify-center gap-10">
      <FooterButton text="MODEL" color="blue" onClick={onModel} />
      <FooterButton text="CAPABILITY" color="orange" onClick={onCapability} />
      <FooterButton text="RESULT" color="green" onClick={onResult} />
    </div>
  );
}
