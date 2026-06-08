import type { SubmissionForm } from '../../types/types';
import './SubmissionItem.css';

interface SubmissionItemProps {
  data: SubmissionForm;
  isNew?: boolean;
}

export const SubmissionItem = ({
  data,
  isNew = false,
}: SubmissionItemProps) => {
  const classes = `card ${isNew ? 'new' : ''}`;

  return (
    <div className={classes}>
      <div className="card-info">
        <h3>{data.name}</h3>
        {data.image && (
          <div>
            <img
              src={data.image}
              alt={`${data.name}`}
              className="card-avatar"
            />
          </div>
        )}
        <p>
          <strong>Age:</strong> {data.age}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Password:</strong> {data.password}
        </p>
        <p>
          <strong>Confirm password:</strong> {data.confirmPassword}
        </p>
        <p>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Country:</strong> {data.country}
        </p>
        <p>
          <strong>{data.terms ? 'Accepted Terms' : 'Terms Declined'}</strong>
        </p>
      </div>
    </div>
  );
};
