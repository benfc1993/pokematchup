import './memberCardStyle.scss';
import { AddMemberByNameForm } from '../../Forms/addMember/AddMemberByNameForm';
import '../../../styles/utils.scss';

export const EmptyCard: React.FC = () => (
  <div className="member-card member-card__empty d-flex align-center justify-center">
    <AddMemberByNameForm />
  </div>
);
