import { useState } from "react";
import "./style.scss";
function SwitchTabs({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0); // here pass the index
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((each: string, index: number) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index && "active"}`}
            onClick={() => activeTab(each, index)}
          >
            {each}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
}

export default SwitchTabs;
