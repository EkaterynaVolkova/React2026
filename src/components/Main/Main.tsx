import { useSubmissions } from '../../store/useGlobalStore';
import { SubmissionItem } from '../SubmissionItem';
import './Main.css';

export const Main = () => {
  const submissionsList = useSubmissions();
  return (
    <main>
      <div className="submissions-grid">
        {submissionsList.map((data, i) => {
          return (
            <SubmissionItem
              key={i}
              data={data}
              isNew={i === submissionsList.length - 1}
            />
          );
        })}
      </div>
    </main>
  );
};
