import { types } from '../../shared/types';
import { TypeIcon, TypeIconSize } from '../TypeIcon/TypeIcon';
import './TypesList.scss';

type TypesListProps = {
  list: string[];
  size?: TypeIconSize;
  showAll?: boolean;
  align?: 'start' | 'center' | 'end';
};

export const TypesList: React.FC<TypesListProps> = (props) => {
  const { list, size, showAll = true, align = 'center' } = props;

  return (
    <div
      className={`${
        showAll ? 'types-list' : `d-flex justify-${align} flex-wrap`
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
