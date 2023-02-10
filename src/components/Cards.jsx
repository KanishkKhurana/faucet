import React, { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import ETHDark from '../assets/images/EthDark.png';
import ETHLight from '../assets/images/EthLight.png';
import LogoDark from '../assets/images/LogoDark.svg';
import LogoLight from '../assets/images/LogoLight.svg';
import { ModeContext } from '../context/ModeContext';
import { BsTwitter } from 'react-icons/bs';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const PhoneNumber = (props) => {
  const [visibility, setVisibility] = useState('');
  const Move = () => {
    setVisibility('hidden');
  };

  const countries = [
    {
      name: 'Afghanistan',
      flag: '🇦🇫',
      code: 'AF',
      dial_code: '93',
    },
    {
      name: 'Åland Islands',
      flag: '🇦🇽',
      code: 'AX',
      dial_code: '358',
    },
    {
      name: 'Albania',
      flag: '🇦🇱',
      code: 'AL',
      dial_code: '355',
    },
    {
      name: 'Algeria',
      flag: '🇩🇿',
      code: 'DZ',
      dial_code: '213',
    },
    {
      name: 'American Samoa',
      flag: '🇦🇸',
      code: 'AS',
      dial_code: '1684',
    },
    {
      name: 'Andorra',
      flag: '🇦🇩',
      code: 'AD',
      dial_code: '376',
    },
    {
      name: 'Angola',
      flag: '🇦🇴',
      code: 'AO',
      dial_code: '244',
    },
    {
      name: 'Anguilla',
      flag: '🇦🇮',
      code: 'AI',
      dial_code: '1264',
    },
    {
      name: 'Antarctica',
      flag: '🇦🇶',
      code: 'AQ',
      dial_code: '672',
    },
    {
      name: 'Antigua and Barbuda',
      flag: '🇦🇬',
      code: 'AG',
      dial_code: '1268',
    },
    {
      name: 'Argentina',
      flag: '🇦🇷',
      code: 'AR',
      dial_code: '54',
    },
    {
      name: 'Armenia',
      flag: '🇦🇲',
      code: 'AM',
      dial_code: '374',
    },
    {
      name: 'Aruba',
      flag: '🇦🇼',
      code: 'AW',
      dial_code: '297',
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      code: 'AU',
      dial_code: '61',
    },
    {
      name: 'Austria',
      flag: '🇦🇹',
      code: 'AT',
      dial_code: '43',
    },
    {
      name: 'Azerbaijan',
      flag: '🇦🇿',
      code: 'AZ',
      dial_code: '994',
    },
    {
      name: 'Bahamas',
      flag: '🇧🇸',
      code: 'BS',
      dial_code: '1242',
    },
    {
      name: 'Bahrain',
      flag: '🇧🇭',
      code: 'BH',
      dial_code: '973',
    },
    {
      name: 'Bangladesh',
      flag: '🇧🇩',
      code: 'BD',
      dial_code: '880',
    },
    {
      name: 'Barbados',
      flag: '🇧🇧',
      code: 'BB',
      dial_code: '1246',
    },
    {
      name: 'Belarus',
      flag: '🇧🇾',
      code: 'BY',
      dial_code: '375',
    },
    {
      name: 'Belgium',
      flag: '🇧🇪',
      code: 'BE',
      dial_code: '32',
    },
    {
      name: 'Belize',
      flag: '🇧🇿',
      code: 'BZ',
      dial_code: '501',
    },
    {
      name: 'Benin',
      flag: '🇧🇯',
      code: 'BJ',
      dial_code: '229',
    },
    {
      name: 'Bermuda',
      flag: '🇧🇲',
      code: 'BM',
      dial_code: '1441',
    },
    {
      name: 'Bhutan',
      flag: '🇧🇹',
      code: 'BT',
      dial_code: '975',
    },
    {
      name: 'Bolivia, Plurinational State of bolivia',
      flag: '🇧🇴',
      code: 'BO',
      dial_code: '591',
    },
    {
      name: 'Bosnia and Herzegovina',
      flag: '🇧🇦',
      code: 'BA',
      dial_code: '387',
    },
    {
      name: 'Botswana',
      flag: '🇧🇼',
      code: 'BW',
      dial_code: '267',
    },
    {
      name: 'Bouvet Island',
      flag: '🇧🇻',
      code: 'BV',
      dial_code: '47',
    },
    {
      name: 'Brazil',
      flag: '🇧🇷',
      code: 'BR',
      dial_code: '55',
    },
    {
      name: 'British Indian Ocean Territory',
      flag: '🇮🇴',
      code: 'IO',
      dial_code: '246',
    },
    {
      name: 'Brunei Darussalam',
      flag: '🇧🇳',
      code: 'BN',
      dial_code: '673',
    },
    {
      name: 'Bulgaria',
      flag: '🇧🇬',
      code: 'BG',
      dial_code: '359',
    },
    {
      name: 'Burkina Faso',
      flag: '🇧🇫',
      code: 'BF',
      dial_code: '226',
    },
    {
      name: 'Burundi',
      flag: '🇧🇮',
      code: 'BI',
      dial_code: '257',
    },
    {
      name: 'Cambodia',
      flag: '🇰🇭',
      code: 'KH',
      dial_code: '855',
    },
    {
      name: 'Cameroon',
      flag: '🇨🇲',
      code: 'CM',
      dial_code: '237',
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      code: 'CA',
      dial_code: '1',
    },
    {
      name: 'Cape Verde',
      flag: '🇨🇻',
      code: 'CV',
      dial_code: '238',
    },
    {
      name: 'Cayman Islands',
      flag: '🇰🇾',
      code: 'KY',
      dial_code: '345',
    },
    {
      name: 'Central African Republic',
      flag: '🇨🇫',
      code: 'CF',
      dial_code: '236',
    },
    {
      name: 'Chad',
      flag: '🇹🇩',
      code: 'TD',
      dial_code: '235',
    },
    {
      name: 'Chile',
      flag: '🇨🇱',
      code: 'CL',
      dial_code: '56',
    },
    {
      name: 'China',
      flag: '🇨🇳',
      code: 'CN',
      dial_code: '86',
    },
    {
      name: 'Christmas Island',
      flag: '🇨🇽',
      code: 'CX',
      dial_code: '61',
    },
    {
      name: 'Cocos (Keeling) Islands',
      flag: '🇨🇨',
      code: 'CC',
      dial_code: '61',
    },
    {
      name: 'Colombia',
      flag: '🇨🇴',
      code: 'CO',
      dial_code: '57',
    },
    {
      name: 'Comoros',
      flag: '🇰🇲',
      code: 'KM',
      dial_code: '269',
    },
    {
      name: 'Congo',
      flag: '🇨🇬',
      code: 'CG',
      dial_code: '242',
    },
    {
      name: 'Congo, The Democratic Republic of the Congo',
      flag: '🇨🇩',
      code: 'CD',
      dial_code: '243',
    },
    {
      name: 'Cook Islands',
      flag: '🇨🇰',
      code: 'CK',
      dial_code: '682',
    },
    {
      name: 'Costa Rica',
      flag: '🇨🇷',
      code: 'CR',
      dial_code: '506',
    },
    {
      name: "Cote d'Ivoire",
      flag: '🇨🇮',
      code: 'CI',
      dial_code: '225',
    },
    {
      name: 'Croatia',
      flag: '🇭🇷',
      code: 'HR',
      dial_code: '385',
    },
    {
      name: 'Cuba',
      flag: '🇨🇺',
      code: 'CU',
      dial_code: '53',
    },
    {
      name: 'Cyprus',
      flag: '🇨🇾',
      code: 'CY',
      dial_code: '357',
    },
    {
      name: 'Czech Republic',
      flag: '🇨🇿',
      code: 'CZ',
      dial_code: '420',
    },
    {
      name: 'Denmark',
      flag: '🇩🇰',
      code: 'DK',
      dial_code: '45',
    },
    {
      name: 'Djibouti',
      flag: '🇩🇯',
      code: 'DJ',
      dial_code: '253',
    },
    {
      name: 'Dominica',
      flag: '🇩🇲',
      code: 'DM',
      dial_code: '1767',
    },
    {
      name: 'Dominican Republic',
      flag: '🇩🇴',
      code: 'DO',
      dial_code: '1849',
    },
    {
      name: 'Ecuador',
      flag: '🇪🇨',
      code: 'EC',
      dial_code: '593',
    },
    {
      name: 'Egypt',
      flag: '🇪🇬',
      code: 'EG',
      dial_code: '20',
    },
    {
      name: 'El Salvador',
      flag: '🇸🇻',
      code: 'SV',
      dial_code: '503',
    },
    {
      name: 'Equatorial Guinea',
      flag: '🇬🇶',
      code: 'GQ',
      dial_code: '240',
    },
    {
      name: 'Eritrea',
      flag: '🇪🇷',
      code: 'ER',
      dial_code: '291',
    },
    {
      name: 'Estonia',
      flag: '🇪🇪',
      code: 'EE',
      dial_code: '372',
    },
    {
      name: 'Ethiopia',
      flag: '🇪🇹',
      code: 'ET',
      dial_code: '251',
    },
    {
      name: 'Falkland Islands (Malvinas)',
      flag: '🇫🇰',
      code: 'FK',
      dial_code: '500',
    },
    {
      name: 'Faroe Islands',
      flag: '🇫🇴',
      code: 'FO',
      dial_code: '298',
    },
    {
      name: 'Fiji',
      flag: '🇫🇯',
      code: 'FJ',
      dial_code: '679',
    },
    {
      name: 'Finland',
      flag: '🇫🇮',
      code: 'FI',
      dial_code: '358',
    },
    {
      name: 'France',
      flag: '🇫🇷',
      code: 'FR',
      dial_code: '33',
    },
    {
      name: 'French Guiana',
      flag: '🇬🇫',
      code: 'GF',
      dial_code: '594',
    },
    {
      name: 'French Polynesia',
      flag: '🇵🇫',
      code: 'PF',
      dial_code: '689',
    },
    {
      name: 'French Southern Territories',
      flag: '🇹🇫',
      code: 'TF',
      dial_code: '262',
    },
    {
      name: 'Gabon',
      flag: '🇬🇦',
      code: 'GA',
      dial_code: '241',
    },
    {
      name: 'Gambia',
      flag: '🇬🇲',
      code: 'GM',
      dial_code: '220',
    },
    {
      name: 'Georgia',
      flag: '🇬🇪',
      code: 'GE',
      dial_code: '995',
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      code: 'DE',
      dial_code: '49',
    },
    {
      name: 'Ghana',
      flag: '🇬🇭',
      code: 'GH',
      dial_code: '233',
    },
    {
      name: 'Gibraltar',
      flag: '🇬🇮',
      code: 'GI',
      dial_code: '350',
    },
    {
      name: 'Greece',
      flag: '🇬🇷',
      code: 'GR',
      dial_code: '30',
    },
    {
      name: 'Greenland',
      flag: '🇬🇱',
      code: 'GL',
      dial_code: '299',
    },
    {
      name: 'Grenada',
      flag: '🇬🇩',
      code: 'GD',
      dial_code: '1473',
    },
    {
      name: 'Guadeloupe',
      flag: '🇬🇵',
      code: 'GP',
      dial_code: '590',
    },
    {
      name: 'Guam',
      flag: '🇬🇺',
      code: 'GU',
      dial_code: '1671',
    },
    {
      name: 'Guatemala',
      flag: '🇬🇹',
      code: 'GT',
      dial_code: '502',
    },
    {
      name: 'Guernsey',
      flag: '🇬🇬',
      code: 'GG',
      dial_code: '44',
    },
    {
      name: 'Guinea',
      flag: '🇬🇳',
      code: 'GN',
      dial_code: '224',
    },
    {
      name: 'Guinea-Bissau',
      flag: '🇬🇼',
      code: 'GW',
      dial_code: '245',
    },
    {
      name: 'Guyana',
      flag: '🇬🇾',
      code: 'GY',
      dial_code: '592',
    },
    {
      name: 'Haiti',
      flag: '🇭🇹',
      code: 'HT',
      dial_code: '509',
    },
    {
      name: 'Heard Island and Mcdonald Islands',
      flag: '🇭🇲',
      code: 'HM',
      dial_code: '672',
    },
    {
      name: 'Holy See (Vatican City State)',
      flag: '🇻🇦',
      code: 'VA',
      dial_code: '379',
    },
    {
      name: 'Honduras',
      flag: '🇭🇳',
      code: 'HN',
      dial_code: '504',
    },
    {
      name: 'Hong Kong',
      flag: '🇭🇰',
      code: 'HK',
      dial_code: '852',
    },
    {
      name: 'Hungary',
      flag: '🇭🇺',
      code: 'HU',
      dial_code: '36',
    },
    {
      name: 'Iceland',
      flag: '🇮🇸',
      code: 'IS',
      dial_code: '354',
    },
    {
      name: 'India',
      flag: '🇮🇳',
      code: 'IN',
      dial_code: '91',
    },
    {
      name: 'Indonesia',
      flag: '🇮🇩',
      code: 'ID',
      dial_code: '62',
    },
    {
      name: 'Iran, Islamic Republic of Persian Gulf',
      flag: '🇮🇷',
      code: 'IR',
      dial_code: '98',
    },
    {
      name: 'Iraq',
      flag: '🇮🇶',
      code: 'IQ',
      dial_code: '964',
    },
    {
      name: 'Ireland',
      flag: '🇮🇪',
      code: 'IE',
      dial_code: '353',
    },
    {
      name: 'Isle of Man',
      flag: '🇮🇲',
      code: 'IM',
      dial_code: '44',
    },
    {
      name: 'Israel',
      flag: '🇮🇱',
      code: 'IL',
      dial_code: '972',
    },
    {
      name: 'Italy',
      flag: '🇮🇹',
      code: 'IT',
      dial_code: '39',
    },
    {
      name: 'Jamaica',
      flag: '🇯🇲',
      code: 'JM',
      dial_code: '1876',
    },
    {
      name: 'Japan',
      flag: '🇯🇵',
      code: 'JP',
      dial_code: '81',
    },
    {
      name: 'Jersey',
      flag: '🇯🇪',
      code: 'JE',
      dial_code: '44',
    },
    {
      name: 'Jordan',
      flag: '🇯🇴',
      code: 'JO',
      dial_code: '962',
    },
    {
      name: 'Kazakhstan',
      flag: '🇰🇿',
      code: 'KZ',
      dial_code: '7',
    },
    {
      name: 'Kenya',
      flag: '🇰🇪',
      code: 'KE',
      dial_code: '254',
    },
    {
      name: 'Kiribati',
      flag: '🇰🇮',
      code: 'KI',
      dial_code: '686',
    },
    {
      name: "Korea, Democratic People's Republic of Korea",
      flag: '🇰🇵',
      code: 'KP',
      dial_code: '850',
    },
    {
      name: 'Korea, Republic of South Korea',
      flag: '🇰🇷',
      code: 'KR',
      dial_code: '82',
    },
    {
      name: 'Kosovo',
      flag: '🇽🇰',
      code: 'XK',
      dial_code: '383',
    },
    {
      name: 'Kuwait',
      flag: '🇰🇼',
      code: 'KW',
      dial_code: '965',
    },
    {
      name: 'Kyrgyzstan',
      flag: '🇰🇬',
      code: 'KG',
      dial_code: '996',
    },
    {
      name: 'Laos',
      flag: '🇱🇦',
      code: 'LA',
      dial_code: '856',
    },
    {
      name: 'Latvia',
      flag: '🇱🇻',
      code: 'LV',
      dial_code: '371',
    },
    {
      name: 'Lebanon',
      flag: '🇱🇧',
      code: 'LB',
      dial_code: '961',
    },
    {
      name: 'Lesotho',
      flag: '🇱🇸',
      code: 'LS',
      dial_code: '266',
    },
    {
      name: 'Liberia',
      flag: '🇱🇷',
      code: 'LR',
      dial_code: '231',
    },
    {
      name: 'Libyan Arab Jamahiriya',
      flag: '🇱🇾',
      code: 'LY',
      dial_code: '218',
    },
    {
      name: 'Liechtenstein',
      flag: '🇱🇮',
      code: 'LI',
      dial_code: '423',
    },
    {
      name: 'Lithuania',
      flag: '🇱🇹',
      code: 'LT',
      dial_code: '370',
    },
    {
      name: 'Luxembourg',
      flag: '🇱🇺',
      code: 'LU',
      dial_code: '352',
    },
    {
      name: 'Macao',
      flag: '🇲🇴',
      code: 'MO',
      dial_code: '853',
    },
    {
      name: 'Macedonia',
      flag: '🇲🇰',
      code: 'MK',
      dial_code: '389',
    },
    {
      name: 'Madagascar',
      flag: '🇲🇬',
      code: 'MG',
      dial_code: '261',
    },
    {
      name: 'Malawi',
      flag: '🇲🇼',
      code: 'MW',
      dial_code: '265',
    },
    {
      name: 'Malaysia',
      flag: '🇲🇾',
      code: 'MY',
      dial_code: '60',
    },
    {
      name: 'Maldives',
      flag: '🇲🇻',
      code: 'MV',
      dial_code: '960',
    },
    {
      name: 'Mali',
      flag: '🇲🇱',
      code: 'ML',
      dial_code: '223',
    },
    {
      name: 'Malta',
      flag: '🇲🇹',
      code: 'MT',
      dial_code: '356',
    },
    {
      name: 'Marshall Islands',
      flag: '🇲🇭',
      code: 'MH',
      dial_code: '692',
    },
    {
      name: 'Martinique',
      flag: '🇲🇶',
      code: 'MQ',
      dial_code: '596',
    },
    {
      name: 'Mauritania',
      flag: '🇲🇷',
      code: 'MR',
      dial_code: '222',
    },
    {
      name: 'Mauritius',
      flag: '🇲🇺',
      code: 'MU',
      dial_code: '230',
    },
    {
      name: 'Mayotte',
      flag: '🇾🇹',
      code: 'YT',
      dial_code: '262',
    },
    {
      name: 'Mexico',
      flag: '🇲🇽',
      code: 'MX',
      dial_code: '52',
    },
    {
      name: 'Micronesia, Federated States of Micronesia',
      flag: '🇫🇲',
      code: 'FM',
      dial_code: '691',
    },
    {
      name: 'Moldova',
      flag: '🇲🇩',
      code: 'MD',
      dial_code: '373',
    },
    {
      name: 'Monaco',
      flag: '🇲🇨',
      code: 'MC',
      dial_code: '377',
    },
    {
      name: 'Mongolia',
      flag: '🇲🇳',
      code: 'MN',
      dial_code: '976',
    },
    {
      name: 'Montenegro',
      flag: '🇲🇪',
      code: 'ME',
      dial_code: '382',
    },
    {
      name: 'Montserrat',
      flag: '🇲🇸',
      code: 'MS',
      dial_code: '1664',
    },
    {
      name: 'Morocco',
      flag: '🇲🇦',
      code: 'MA',
      dial_code: '212',
    },
    {
      name: 'Mozambique',
      flag: '🇲🇿',
      code: 'MZ',
      dial_code: '258',
    },
    {
      name: 'Myanmar',
      flag: '🇲🇲',
      code: 'MM',
      dial_code: '95',
    },
    {
      name: 'Namibia',
      flag: '🇳🇦',
      code: 'NA',
      dial_code: '264',
    },
    {
      name: 'Nauru',
      flag: '🇳🇷',
      code: 'NR',
      dial_code: '674',
    },
    {
      name: 'Nepal',
      flag: '🇳🇵',
      code: 'NP',
      dial_code: '977',
    },
    {
      name: 'Netherlands',
      flag: '🇳🇱',
      code: 'NL',
      dial_code: '31',
    },
    {
      name: 'Netherlands Antilles',
      flag: '',
      code: 'AN',
      dial_code: '599',
    },
    {
      name: 'New Caledonia',
      flag: '🇳🇨',
      code: 'NC',
      dial_code: '687',
    },
    {
      name: 'New Zealand',
      flag: '🇳🇿',
      code: 'NZ',
      dial_code: '64',
    },
    {
      name: 'Nicaragua',
      flag: '🇳🇮',
      code: 'NI',
      dial_code: '505',
    },
    {
      name: 'Niger',
      flag: '🇳🇪',
      code: 'NE',
      dial_code: '227',
    },
    {
      name: 'Nigeria',
      flag: '🇳🇬',
      code: 'NG',
      dial_code: '234',
    },
    {
      name: 'Niue',
      flag: '🇳🇺',
      code: 'NU',
      dial_code: '683',
    },
    {
      name: 'Norfolk Island',
      flag: '🇳🇫',
      code: 'NF',
      dial_code: '672',
    },
    {
      name: 'Northern Mariana Islands',
      flag: '🇲🇵',
      code: 'MP',
      dial_code: '1670',
    },
    {
      name: 'Norway',
      flag: '🇳🇴',
      code: 'NO',
      dial_code: '47',
    },
    {
      name: 'Oman',
      flag: '🇴🇲',
      code: 'OM',
      dial_code: '968',
    },
    {
      name: 'Pakistan',
      flag: '🇵🇰',
      code: 'PK',
      dial_code: '92',
    },
    {
      name: 'Palau',
      flag: '🇵🇼',
      code: 'PW',
      dial_code: '680',
    },
    {
      name: 'Palestinian Territory, Occupied',
      flag: '🇵🇸',
      code: 'PS',
      dial_code: '970',
    },
    {
      name: 'Panama',
      flag: '🇵🇦',
      code: 'PA',
      dial_code: '507',
    },
    {
      name: 'Papua New Guinea',
      flag: '🇵🇬',
      code: 'PG',
      dial_code: '675',
    },
    {
      name: 'Paraguay',
      flag: '🇵🇾',
      code: 'PY',
      dial_code: '595',
    },
    {
      name: 'Peru',
      flag: '🇵🇪',
      code: 'PE',
      dial_code: '51',
    },
    {
      name: 'Philippines',
      flag: '🇵🇭',
      code: 'PH',
      dial_code: '63',
    },
    {
      name: 'Pitcairn',
      flag: '🇵🇳',
      code: 'PN',
      dial_code: '64',
    },
    {
      name: 'Poland',
      flag: '🇵🇱',
      code: 'PL',
      dial_code: '48',
    },
    {
      name: 'Portugal',
      flag: '🇵🇹',
      code: 'PT',
      dial_code: '351',
    },
    {
      name: 'Puerto Rico',
      flag: '🇵🇷',
      code: 'PR',
      dial_code: '1939',
    },
    {
      name: 'Qatar',
      flag: '🇶🇦',
      code: 'QA',
      dial_code: '974',
    },
    {
      name: 'Romania',
      flag: '🇷🇴',
      code: 'RO',
      dial_code: '40',
    },
    {
      name: 'Russia',
      flag: '🇷🇺',
      code: 'RU',
      dial_code: '7',
    },
    {
      name: 'Rwanda',
      flag: '🇷🇼',
      code: 'RW',
      dial_code: '250',
    },
    {
      name: 'Reunion',
      flag: '🇷🇪',
      code: 'RE',
      dial_code: '262',
    },
    {
      name: 'Saint Barthelemy',
      flag: '🇧🇱',
      code: 'BL',
      dial_code: '590',
    },
    {
      name: 'Saint Helena, Ascension and Tristan Da Cunha',
      flag: '🇸🇭',
      code: 'SH',
      dial_code: '290',
    },
    {
      name: 'Saint Kitts and Nevis',
      flag: '🇰🇳',
      code: 'KN',
      dial_code: '1869',
    },
    {
      name: 'Saint Lucia',
      flag: '🇱🇨',
      code: 'LC',
      dial_code: '1758',
    },
    {
      name: 'Saint Martin',
      flag: '🇲🇫',
      code: 'MF',
      dial_code: '590',
    },
    {
      name: 'Saint Pierre and Miquelon',
      flag: '🇵🇲',
      code: 'PM',
      dial_code: '508',
    },
    {
      name: 'Saint Vincent and the Grenadines',
      flag: '🇻🇨',
      code: 'VC',
      dial_code: '1784',
    },
    {
      name: 'Samoa',
      flag: '🇼🇸',
      code: 'WS',
      dial_code: '685',
    },
    {
      name: 'San Marino',
      flag: '🇸🇲',
      code: 'SM',
      dial_code: '378',
    },
    {
      name: 'Sao Tome and Principe',
      flag: '🇸🇹',
      code: 'ST',
      dial_code: '239',
    },
    {
      name: 'Saudi Arabia',
      flag: '🇸🇦',
      code: 'SA',
      dial_code: '966',
    },
    {
      name: 'Senegal',
      flag: '🇸🇳',
      code: 'SN',
      dial_code: '221',
    },
    {
      name: 'Serbia',
      flag: '🇷🇸',
      code: 'RS',
      dial_code: '381',
    },
    {
      name: 'Seychelles',
      flag: '🇸🇨',
      code: 'SC',
      dial_code: '248',
    },
    {
      name: 'Sierra Leone',
      flag: '🇸🇱',
      code: 'SL',
      dial_code: '232',
    },
    {
      name: 'Singapore',
      flag: '🇸🇬',
      code: 'SG',
      dial_code: '65',
    },
    {
      name: 'Slovakia',
      flag: '🇸🇰',
      code: 'SK',
      dial_code: '421',
    },
    {
      name: 'Slovenia',
      flag: '🇸🇮',
      code: 'SI',
      dial_code: '386',
    },
    {
      name: 'Solomon Islands',
      flag: '🇸🇧',
      code: 'SB',
      dial_code: '677',
    },
    {
      name: 'Somalia',
      flag: '🇸🇴',
      code: 'SO',
      dial_code: '252',
    },
    {
      name: 'South Africa',
      flag: '🇿🇦',
      code: 'ZA',
      dial_code: '27',
    },
    {
      name: 'South Sudan',
      flag: '🇸🇸',
      code: 'SS',
      dial_code: '211',
    },
    {
      name: 'South Georgia and the South Sandwich Islands',
      flag: '🇬🇸',
      code: 'GS',
      dial_code: '500',
    },
    {
      name: 'Spain',
      flag: '🇪🇸',
      code: 'ES',
      dial_code: '34',
    },
    {
      name: 'Sri Lanka',
      flag: '🇱🇰',
      code: 'LK',
      dial_code: '94',
    },
    {
      name: 'Sudan',
      flag: '🇸🇩',
      code: 'SD',
      dial_code: '249',
    },
    {
      name: 'Suriname',
      flag: '🇸🇷',
      code: 'SR',
      dial_code: '597',
    },
    {
      name: 'Svalbard and Jan Mayen',
      flag: '🇸🇯',
      code: 'SJ',
      dial_code: '47',
    },
    {
      name: 'Swaziland',
      flag: '🇸🇿',
      code: 'SZ',
      dial_code: '268',
    },
    {
      name: 'Sweden',
      flag: '🇸🇪',
      code: 'SE',
      dial_code: '46',
    },
    {
      name: 'Switzerland',
      flag: '🇨🇭',
      code: 'CH',
      dial_code: '41',
    },
    {
      name: 'Syrian Arab Republic',
      flag: '🇸🇾',
      code: 'SY',
      dial_code: '963',
    },
    {
      name: 'Taiwan',
      flag: '🇹🇼',
      code: 'TW',
      dial_code: '886',
    },
    {
      name: 'Tajikistan',
      flag: '🇹🇯',
      code: 'TJ',
      dial_code: '992',
    },
    {
      name: 'Tanzania, United Republic of Tanzania',
      flag: '🇹🇿',
      code: 'TZ',
      dial_code: '255',
    },
    {
      name: 'Thailand',
      flag: '🇹🇭',
      code: 'TH',
      dial_code: '66',
    },
    {
      name: 'Timor-Leste',
      flag: '🇹🇱',
      code: 'TL',
      dial_code: '670',
    },
    {
      name: 'Togo',
      flag: '🇹🇬',
      code: 'TG',
      dial_code: '228',
    },
    {
      name: 'Tokelau',
      flag: '🇹🇰',
      code: 'TK',
      dial_code: '690',
    },
    {
      name: 'Tonga',
      flag: '🇹🇴',
      code: 'TO',
      dial_code: '676',
    },
    {
      name: 'Trinidad and Tobago',
      flag: '🇹🇹',
      code: 'TT',
      dial_code: '1868',
    },
    {
      name: 'Tunisia',
      flag: '🇹🇳',
      code: 'TN',
      dial_code: '216',
    },
    {
      name: 'Turkey',
      flag: '🇹🇷',
      code: 'TR',
      dial_code: '90',
    },
    {
      name: 'Turkmenistan',
      flag: '🇹🇲',
      code: 'TM',
      dial_code: '993',
    },
    {
      name: 'Turks and Caicos Islands',
      flag: '🇹🇨',
      code: 'TC',
      dial_code: '1649',
    },
    {
      name: 'Tuvalu',
      flag: '🇹🇻',
      code: 'TV',
      dial_code: '688',
    },
    {
      name: 'Uganda',
      flag: '🇺🇬',
      code: 'UG',
      dial_code: '256',
    },
    {
      name: 'Ukraine',
      flag: '🇺🇦',
      code: 'UA',
      dial_code: '380',
    },
    {
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      code: 'AE',
      dial_code: '971',
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      code: 'GB',
      dial_code: '44',
    },
    {
      name: 'United States',
      flag: '🇺🇸',
      code: 'US',
      dial_code: '1',
    },
    {
      name: 'Uruguay',
      flag: '🇺🇾',
      code: 'UY',
      dial_code: '598',
    },
    {
      name: 'Uzbekistan',
      flag: '🇺🇿',
      code: 'UZ',
      dial_code: '998',
    },
    {
      name: 'Vanuatu',
      flag: '🇻🇺',
      code: 'VU',
      dial_code: '678',
    },
    {
      name: 'Venezuela, Bolivarian Republic of Venezuela',
      flag: '🇻🇪',
      code: 'VE',
      dial_code: '58',
    },
    {
      name: 'Vietnam',
      flag: '🇻🇳',
      code: 'VN',
      dial_code: '84',
    },
    {
      name: 'Virgin Islands, British',
      flag: '🇻🇬',
      code: 'VG',
      dial_code: '1284',
    },
    {
      name: 'Virgin Islands, U.S.',
      flag: '🇻🇮',
      code: 'VI',
      dial_code: '1340',
    },
    {
      name: 'Wallis and Futuna',
      flag: '🇼🇫',
      code: 'WF',
      dial_code: '681',
    },
    {
      name: 'Yemen',
      flag: '🇾🇪',
      code: 'YE',
      dial_code: '967',
    },
    {
      name: 'Zambia',
      flag: '🇿🇲',
      code: 'ZM',
      dial_code: '260',
    },
    {
      name: 'Zimbabwe',
      flag: '🇿🇼',
      code: 'ZW',
      dial_code: '263',
    },
  ];

  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);

  const onSubmit = async () => {
    // e.preventDefault();
    console.log(props.country);
    props.setStep('2');
    console.log(props.phone);
    setTimeout(Move, 300);
  };

  //  const sendPhone = async () => {
  // 	       await axios.post('https://testnetfaucet.io/api/requestTokens', {
  //            phone: num,
  //            captchaCode: props.captcha
  //          })
  //          .then(function (response) {
  //            console.log(response);
  //          })
  //          .catch(function (error) {
  //            console.log(error);
  //          });
  //    }

  return (
    <div className={`${visibility}`}>
      <div
        className={` ${
          props.step === '1' ? ' scale-100 duration-300' : 'scale-0 duration-300 '
        } flex justify-center xl:justify-center w-full`}
      >
        <div
          className={`bg-gradient-to-b backdrop-blur-sm rounded-xl  w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
            dark
              ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
              : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
          }`}
        >
          <div className='flex font-primary xl:text-4xl'>1.</div>
          <div className='text-left mt-4 xl:ml-16'>
            <h1 className='font-primary xl:text-4xl text-xl '>Enter Your Phone Number </h1>
            <div
              className={`font-secondary  ${dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'}`}
            >
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                In order to prevent spam we need to verify your number
              </p>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row mt-12 xl:ml-16 gap-2'>
            <div className='xl:basis-1/6 basis-1/3'>
              {/* <PhoneInput
        initialCountry="ua"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 px-3 ${dark ? "from-[#8C8C8C] to-[#8C8C8C]" : "from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]"}`}
      /> */}
              <select
                name='countrycode'
                id=''
                className={`border-[0.05rem] h-full bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 text-xs rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                  dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
                }`}
                onChange={(e) => props.setCountry(e.target.value)}
              >
                <option>Select Country</option>
                {countries.map((country) => {
                  return (
                    <option value={country.dial_code} key={country.code}>
                      {country.flag}
                      {'   '}
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type='text'
              className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
              }`}
              placeholder='XXXXXXXXXX'
              onChange={(e) => props.setPhone(e.target.value)}
            />
          </div>
          <div className='mt-12 flex xl:ml-16 pb-12'>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={() => onSubmit()}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
        <div className=''><p className='font-secondary font-thin text-xs pt-2'>*You can only claim upto 35 Goerli Ethereum Testnet per month.</p></div>
    </div>
  );
};

const WalletDetails = (props) => {
  const [visibility, setVisibility] = useState(false);
  const Move = () => {
    setVisibility(true);
  };
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);
  const validWalletExp = new RegExp(/^0x[a-fA-F0-9]{40}$/g);
  const [valid, setValid] = useState(false); //control program flow
  const [validWallet, setValidWallet] = useState(''); //local wallet store
  const [errorMsg, setErrorMsg] = useState(false); //if incorrect wallet, show error msg
  const [apiError, setApiError] = useState(false); //if api error, show error msg

  const sendPhone = async (captcha) => {
    try {
      const { data } = await axios.post('https://testnetfaucet.io/api/requestTokens', {
        phone: props.country + props.phone,
        captchaCode: captcha,
      });
      console.log(data);
      const id = data.requestId;
      const myReqId = id.toString();
      await props.setReqId(myReqId);
      console.log(props.reqId);
      return data;
    } catch (error) {
      console.log(error);
      setApiError(true);
    }
  };

  const validate = async () => {
    console.log(validWallet);
    if (validWalletExp.test(validWallet)) {
      console.log('wallet correct');
      await setValid(true);
      await props.setWallet(validWallet);
      await setErrorMsg(false);
    } else {
      console.log('wallet NOT correct');
      await setErrorMsg(true);
      await setValid(false);
    }
  };

  const recaptchaRef = React.useRef();

  const handleSubmit = async (event) => {
    console.log(props.country + props.phone);
    const validWalletExp = new RegExp(/^0x[a-fA-F0-9]{40}$/g);
    const isValid = validWalletExp.test(validWallet);

    if (isValid) {
      props.setWallet(validWallet);
      console.log('Getting captcha token');
      const token = await recaptchaRef.current.executeAsync();
      console.log(`Captcha token: ${token}`);
      if (token) {
        const data = await sendPhone(token);
        recaptchaRef.current.reset();
        if (!apiError) {
          props.setStep('3');
          setTimeout(Move, 300);
        }
      } else {
        console.log(`Error occured in captcha`);
      }
    } else {
      setErrorMsg(true);
      setValid(false);
    }
  };

  return (
    <div className={`${visibility ? 'hidden' : ''}`}>
      <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey='6Le3-V0kAAAAAFY4G4gCawIs5EePPYBO_a425QM2' />
      <div
        className={` ${
          props.step === '2' ? 'scale-100 duration-300' : 'scale-0 duration-300 '
        } flex justify-center xl:justify-center w-full`}
      >
        <div
          className={`bg-gradient-to-b backdrop-blur-sm rounded-xl  w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
            dark
              ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
              : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
          }`}
        >
          <div className='flex font-primary xl:text-4xl'>2.</div>
          <div className='text-left mt-4 xl:ml-16'>
            <h1 className='font-primary xl:text-4xl text-xl '>Enter Your Wallet Details</h1>
            <div
              className={`font-secondary  ${dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'}`}
            >
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                Provide your Ethereum wallet address where you wish to receive the Goerli ETH
              </p>
            </div>
          </div>
          <div className='flex mt-12 xl:ml-16'>
            <input
              type='text'
              className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3  text-black text-center font-primary py-3 ${
                dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
              }`}
              placeholder='0x3c04391.....sffe28'
              onChange={(e) => setValidWallet(e.target.value)}
            />
          </div>
          {errorMsg && (
            <div>
              {' '}
              <p
                className={`font-secondary xl:ml-16  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                } text-left mt-2 text-xs`}
              >
                {' '}
                Please enter correct wallet address{' '}
              </p>
            </div>
          )}
          {apiError && (
            <div>
              {' '}
              <p
                className={`font-secondary xl:ml-16  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                } text-left mt-2 text-xs`}
              >
                {' '}
                Please try again later{' '}
              </p>
            </div>
          )}
          <div className='mt-12 flex xl:ml-16 pb-12'>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyOTP = (props) => {
  const [visibility, setVisibility] = useState(false);
  const Move = () => {
    setVisibility(true);
  };
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);

  const [process, setProcess] = useState(false);
  const recaptchaRef = React.useRef();
  const [otpIssue, setOtpIssue] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const verifyPhone = async (captcha) => {
    try {
      const { data } = await axios.post('https://testnetfaucet.io/api/verifyRequest', {
        requestId: props.reqId,
        code: props.otp,
        address: props.wallet,
        captchaCode: captcha,
      });
      await setOtpIssue(false);
      // console.log(response);
    } catch (error) {
      console.log(error);
      await setOtpIssue(true);
      await setErrorMsg(true);
    }

    // await axios
    //   .post('https://testnetfaucet.io/api/verifyRequest', {
    //     requestId: props.reqId,
    //     code: props.otp,
    //     address: props.wallet,
    //     captchaCode: captcha,
    //   })
    //   .then(function (response) {

    //   })
    //   .catch(function (error) {

    //   });
  };
  const resendOTP = async (captcha) => {
    await axios
      .post('https://testnetfaucet.io/api/requestTokens/resend', {
        requestId: props.reqId,
        captchaCode: captcha,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = async (event) => {
    //   event.preventDefault();
    setProcess(true);
    console.log('in handle submit');
    // Execute the reCAPTCHA when the form is submitted
    const token = await recaptchaRef.current.executeAsync();
    console.log('here');
    console.log(token);
    if (token) {
      await verifyPhone(token);
      if (otpIssue === false) {
        console.log('resetting token');
        setProcess(false);
        recaptchaRef.current.reset();
        props.setStep('4');
        setTimeout(Move, 300);
      }
    }
  };

  const handleResendOTP = async (event) => {
    //   event.preventDefault();
    console.log('in handle submit');
    // Execute the reCAPTCHA when the form is submitted
    const token = await recaptchaRef.current.executeAsync();
    console.log('here');
    console.log(token);
    if (token) {
      resendOTP(token);
      console.log('resetting token');
      recaptchaRef.current.reset();
    }
  };

  return (
    <div className={`${visibility ? 'hidden' : ''}`}>
      <ReCAPTCHA ref={recaptchaRef} size='invisible' sitekey='6Le3-V0kAAAAAFY4G4gCawIs5EePPYBO_a425QM2' />

      <div
        className={` ${props.step === '3' ? 'scale-100 duration-300' : 'scale-0 duration-300 '} flex justify-center `}
      >
        <div
          className={`bg-gradient-to-b backdrop-blur-sm rounded-xl  w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
            dark
              ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
              : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
          }`}
        >
          <div className='flex font-primary xl:text-4xl'>3.</div>
          <div className='text-left mt-4 xl:ml-16'>
            <h1 className='font-primary xl:text-4xl text-xl '>Verify Your OTP</h1>
            <div
              className={`font-secondary  ${dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'}`}
            >
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                Enter the OTP you received in order to receive the Goerli ETH
              </p>
            </div>
          </div>
          <div className='flex mt-12 xl:ml-16'>
            <input
              type='text'
              className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
              }`}
              placeholder='- - - - - -'
              onChange={(e) => props.setOtp(e.target.value)}
            />
          </div>
          {process && (
            <div>
              {' '}
              <p
                className={`font-secondary xl:ml-16  ${
                  dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
                } text-left mt-2 text-xs`}
              >
                {' '}
                {errorMsg ? 'Please enter the correct OTP' : `Processing Request...`}{' '}
              </p>
            </div>
          )}

          <div className='mt-12 flex flex-col xl:flex-row gap-5 xl:ml-16 pb-12'>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={() => handleSubmit()}
            >
              SUBMIT
            </button>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
              onClick={() => handleResendOTP()}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Done = (props) => {
  const [visibility, setVisibility] = useState(false);
  const Move = () => {
    setVisibility(true);
  };
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);

  return (
    <div className={`${visibility ? 'hidden' : ''}`}>
      <div
        className={`${props.step === '4' ? 'scale-100 duration-300' : 'scale-0 duration-300 '}  flex justify-center `}
      >
        <div
          className={`bg-gradient-to-b backdrop-blur-sm rounded-xl  w-11/12 xl:min-w-min  border-[0.03rem]  p-5 ${
            dark
              ? 'from-[#0000669c] to-[#000000a1] border-[#e8e6ebb0]'
              : 'from-[#0077B6] to-[#ffffff3f] border-[#03045E]'
          }`}
        >
          <div className='flex font-primary xl:text-4xl'>4.</div>
          <div className='text-left mt-4 xl:ml-16'>
            <h1 className='font-primary xl:text-4xl text-xl '>All Done!</h1>
            <div
              className={`font-secondary  ${dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'}`}
            >
              <p className='xl:w-3/4 my-3 xl:my-5 xl:text-xl text-xs'>
                Thank you for submitting your details to receive test tokens from the Goerli faucet. Please also share
                your Github repository for the project you are building.
              </p>
            </div>
          </div>
          <div className='flex mt-12 xl:ml-16'>
            <input
              type='text'
              className={`border-[0.05rem] bg-gradient-to-r via-[#E2E2E2] placeholder-gray-500 rounded-lg w-full xl:basis-2/3 text-black text-center font-primary py-3 ${
                dark ? 'from-[#8C8C8C] to-[#8C8C8C]' : 'from-[#ADE8F4] to-[#ADE8F4] border border-[#000088]'
              }`}
              placeholder='Enter Github Repo Link'
            />
          </div>
          <div className='mt-12 flex xl:ml-16 pb-12'>
            <button
              className={` ${
                dark ? 'bg-[#000088]' : 'bg-[#48CAE4] border border-[#000088]'
              } w-full xl:w-fit xl:text-3xl text-base font-primary px-16 tracking-wider py-3 rounded-lg border-[0.05rem]`}
            >
              SUBMIT
            </button>
          </div>
          <div
            className={`font-secondary mt-4 xl:ml-16  ${
              dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-semibold'
            }`}
          >
            <p className='xl:w-3/4 my-3 xl:my-5 xl:mb-1 xl:text-sm text-xs text-left'>
              Enjoyed the experience? Let the world know!
            </p>
          </div>
          <div className='mt-1 flex xl:ml-16 pb-12'>
            <button
              className={` flex gap-3 tracking-tighter ${
                dark ? 'bg-[#1DA1F2]' : 'bg-[#1DA1F2] border border-[#000088]'
              } xl:w-fit xl:text-lg text-base font-primary px-10 tracking-wider py-3 rounded-lg border-[0.05rem]`}
            >
              <BsTwitter className='font-white mt-1' />
              Tweet Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Cards(props) {
  const [step, setStep] = useState('1');
  const { dark, setIsDark, toggleDarkMode } = useContext(ModeContext);
  const [logo, setLogo] = useState(LogoDark);
  useEffect(() => {
    if (dark) {
      setLogo(LogoDark);
    } else {
      setLogo(LogoLight);
    }
  }, [dark]);

  const [phone, setPhone] = useState('');
  const [wallet, setWallet] = useState('');
  const [otp, setOtp] = useState('');
  const [github, setGithub] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [reqId, setReqId] = useState('');
  const [country, setCountry] = useState('');

  return (
    <div className='py-4 xl:py-20 xl:px-52' id='home'>
      <div className='absolute -right-72 xl:-right-20 top-full overflow-hidden xl:w-10/12 w-5/12  -z-0'>
        {/* <Image src={ETHDark} className="xl:w-10/12 w-5/12" /> */}
      </div>
      <div className='flex flex-col justify-center z-20 select-none'>
        <h1 className='font-primary text-4xl xl:text-7xl text-center xl:text-center mx-2 xl:mx-0'>GOERLI ETHEREUM FAUCET</h1>
        <div className='flex justify-center'>
          {/* <p
            className={`font-secondary xl:text-xl text-sm  text-center xl:text-left xl:w-4/6 mt-3 ${
              dark ? 'text-[#D2D2D2] font-extralight' : 'text-[#023E8A] font-medium'
            }  mx-4 xl:mx-0 xl:ml-4`}
          >
            This website is created by builders for builders. Proceed with the following steps in order to receive testnet tokens to keep on building amazing products, features & more. At Delta we want to provide developers/ builders with every necessary tool & resource they need in order to grow, test and launch their project.
          </p> */}
        </div>
      </div>
      <div className='xl:mt-10 mt-5' />
      <div className='absolute xl:-left-96 -left-28 top-40 xl:top-32 z-0 select-none'>
        <Image src={LogoDark} className='w-8/12 xl:w-10/12' />
      </div>
      <div className='relative xl:pb-[33rem] pb-96 '>
        <div className='absolute z-40 w-full'>
          <PhoneNumber
            step={step}
            setStep={setStep}
            phone={phone}
            setPhone={setPhone}
            country={country}
            setCountry={setCountry}
          />
        </div>

        <div className='absolute z-30 w-full'>
          <WalletDetails
            step={step}
            setStep={setStep}
            wallet={wallet}
            setWallet={setWallet}
            country={country}
            phone={phone}
            reqId={reqId}
            captcha={captcha}
            setReqId={setReqId}
            setCaptcha={setCaptcha}
          />
        </div>
        <div className='absolute z-20 w-full'>
          <VerifyOTP
            step={step}
            setStep={setStep}
            otp={otp}
            setOtp={setOtp}
            phone={phone}
            wallet={wallet}
            reqId={reqId}
          />
        </div>
        <div className='absolute z-10 w-full'>
          <Done step={step} setStep={setStep} github={github} setGithub={setGithub} />
        </div>
      </div>
    </div>
  );
}
