import styled from 'styled-components';
import { ReactComponent as Male } from '../assets/genders/male.svg';
import { ReactComponent as Female } from '../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../assets/genders/genderless.svg';

export function CardTitle({ name, gender }) {
  let Icon = null;
  if (gender === 'Male') {
    Icon = <Male width={20} height={20} fill="#33b3c8" title="Male" />;
  } else if (gender === 'Female') {
    Icon = <Female width={24} height={24} fill="pink" title="Female" />;
  } else if (gender === 'unknown' || gender === 'Genderless') {
    Icon = <Genderless width={24} height={24} fill="#999" title="Genderless" />;
  }

  return (
    <TitleRow>
      <TitleText className="card-title">{name}</TitleText>
      <IconBox>{Icon}</IconBox>
    </TitleRow>
  );
}

export function CardStatus({ status, species, type }) {
  return (
    <StatusRow>
      <StatusDot status={status}>{status}</StatusDot>
      &nbsp;-&nbsp;
      <span>{species}</span>
      {type && <TypeText>{type}</TypeText>}
    </StatusRow>
  );
}

export function Card({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  return (
    <CardBox onClick={onClickHandler}>
      <CardImg src={image} alt={name} />
      <CardInfo>
        <CardTitle name={name} gender={gender} />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </CardBox>
  );
}

const CardBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const CardImg = styled.img`
  border-radius: 10px 10px 0 0;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleText = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;

const IconBox = styled.div`
  display: flex;
`;

const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StatusDot = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ status }) => {
      switch (status) {
        case 'Alive':
          return '#83bf46';
        case 'Dead':
          return '#ff5152';
        default:
          return '#968c9d';
      }
    }};
  }
`;

const TypeText = styled.p`
  margin-top: 20px;
  width: 100%;
  color: #ddd;
  font-size: 16px;
`;
