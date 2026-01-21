import { useState } from 'react';
import Checkbox from './Checkbox';
import { PAGES } from '../../constants/pages';
import styles from './PageSelector.module.css';

export default function PageSelector() {
  const [selectedPages, setSelectedPages] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");

  const allSelected = selectedPages.length === PAGES.length;
  const partiallySelected = selectedPages.length > 0 && !allSelected;

  const toggleAll = () => {
    setSelectedPages(allSelected ? [] : PAGES.map(p => p.id));
  };

  const togglePage = (id) => {
    setSelectedPages(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleDoneClick = () => {
    if (selectedPages.length === 0) {
      setInfoMessage("Belum ada halaman yang dipilih.");
    } else {
      const selectedLabels = PAGES.filter(p => selectedPages.includes(p.id))
                                   .map(p => p.label)
                                   .join(", ");
      setInfoMessage(`Successfully selected: ${selectedLabels}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Select All */}
      <div className={styles.allPagesRow}>
        <span>All pages</span>
        <Checkbox
          checked={allSelected}
          indeterminate={partiallySelected}
          onChange={toggleAll}
        />
      </div>

      <div className={styles.divider} />

      {/* List Pages */}
      <div className={styles.list}>
        {PAGES.map(page => (
          <div key={page.id} className={styles.row}>
            <span>{page.label}</span>
            <Checkbox
              checked={selectedPages.includes(page.id)}
              onChange={() => togglePage(page.id)} 
            />
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Done button */}
      <div className={styles.doneButtonContainer}>
        <button className={styles.doneButton} onClick={handleDoneClick}>
          Done
        </button>
      </div>

      {/* Info Message */}
      {infoMessage && (
        <div style={{ padding: "8px 15px", fontSize: "14px", color: "#333" }}>
          {infoMessage}
        </div>
      )}
    </div>
  );
}