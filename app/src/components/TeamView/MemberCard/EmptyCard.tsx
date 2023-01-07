import { Link } from 'react-router-dom';
import './memberCardStyle.scss';
import '../../../styles/utils.scss';

export const EmptyCard: React.FC = () => (
  <div className="member-card member-card__empty d-flex align-center justify-center">
    <Link to={`add`} className="member-card__empty--link">
      <p className="m-0 text-xxl">+</p>
    </Link>
  </div>
);
