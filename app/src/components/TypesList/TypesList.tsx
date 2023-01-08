import { types } from '../../shared/types';
import { TypeIcon } from '../TypeIcon/TypeIcon';
import './TypesList.scss';

type TypesListProps = {
  list: string[];
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  showAll?: boolean;
};

export const TypesList: React.FC<TypesListProps> = (props) => {
  const { list, size, showAll = true } = props;

  return (
    <div
      className={`${
        showAll ? 'types-list' : 'd-flex justify-center flex-wrap'
      }`}
    >
      {types.sort().map((type, idx) => {
        const display = showAll || list.includes(type);
        return (
          display && (
            <TypeIcon
              key={`${type}-${idx}`}
              type={type}
              size={size}
              style={{
                opacity: list.includes(type) ? 1 : 0.3
              }}
            />
          )
        );
      })}
    </div>
  );
};
