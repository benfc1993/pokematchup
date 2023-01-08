import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sentenceCase } from '../../utils.ts/sentenceCase';
import { TypeIconSize } from '../TypeIcon/TypeIcon';
import { TypesList } from '../TypesList/TypesList';
import './PokemonStats.scss';

type Stats = Record<StatOrder, string[]>;

interface PokemonStatsProps<T extends Stats> {
  stats: T;
  exclude?: StatOrder[];
  showHints?: boolean;
  iconSize?: TypeIconSize;
}

const statOrder = [
  'types',
  'weakness',
  'defence',
  'offence',
  'resistances'
] as const;

type StatOrder = typeof statOrder[number];

const hints: Partial<Record<StatOrder, string>> = {
  defence: 'You take 1/2 damage',
  offence: 'You deal 2x damage',
  weakness: 'You take 2X damage',
  resistances: 'You take 0 damage'
};

export const PokemonStats = <T extends Stats>(props: PokemonStatsProps<T>) => {
  const { stats, showHints = false, iconSize = 'medium', exclude = [] } = props;
  let count = 0;
  return (
    <>
      {statOrder.map((stat) => {
        const statData: string[] = stats[stat];
        const show = statData instanceof Array && !exclude.includes(stat);
        if (show) count++;

        return (
          show && (
            <div key={stat} className="pokemon__stat">
              {count > 1 && <FontAwesomeIcon icon={faMinus} />}
              <div style={{ marginBottom: '0.5em' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {sentenceCase(stat)}
                </p>
                {showHints && (
                  <p style={{ fontSize: '0.7em' }}>{hints[stat]}</p>
                )}
              </div>
              <TypesList list={statData} showAll={false} size={iconSize} />
            </div>
          )
        );
      })}
    </>
  );
};
