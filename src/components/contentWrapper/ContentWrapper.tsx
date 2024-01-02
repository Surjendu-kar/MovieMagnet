import "./style.scss";
type ContentWrapperProps = {
  children: React.ReactNode;
};
const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
