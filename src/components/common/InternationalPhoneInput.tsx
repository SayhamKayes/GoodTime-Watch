import React, { useState, useEffect } from 'react';
import { CountryCodeDropdown } from './CountryCodeDropdown';
import {
  parsePhoneNumberParts,
  buildTelLink,
  buildInternationalDial
} from '../../data/countryCodes';
import { Phone } from 'lucide-react';

interface InternationalPhoneInputProps {
  value: string;
  onChange: (fullDial: string, telUri: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
}

export const InternationalPhoneInput: React.FC<InternationalPhoneInputProps> = ({
  value,
  onChange,
  placeholder = '1327426905',
  label,
  helperText
}) => {
  const initial = parsePhoneNumberParts(value);
  const [dialCode, setDialCode] = useState(initial.dialCode || '+880');
  const [nationalNumber, setNationalNumber] = useState(initial.nationalNumber || '');

  // Keep state synced if value changes externally
  useEffect(() => {
    const parsed = parsePhoneNumberParts(value, dialCode);
    setDialCode(parsed.dialCode);
    setNationalNumber(parsed.nationalNumber);
  }, [value]);

  const handleCountryChange = (newCode: string) => {
    setDialCode(newCode);
    const full = buildInternationalDial(newCode, nationalNumber);
    const tel = buildTelLink(newCode, nationalNumber);
    onChange(full, tel);
  };

  const handleNumberChange = (num: string) => {
    setNationalNumber(num);
    const full = buildInternationalDial(dialCode, num);
    const tel = buildTelLink(dialCode, num);
    onChange(full, tel);
  };

  const previewTel = buildTelLink(dialCode, nationalNumber);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="font-mono text-slate-200 text-xs flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>{label}</span>
        </label>
      )}

      {/* Input Group: [tel:] [Country Code Dropdown] [Number Input] */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center px-2.5 h-10 rounded-lg bg-black/60 border border-white/10 text-slate-400 font-mono text-xs select-none shrink-0">
          tel:
        </div>

        <CountryCodeDropdown
          selectedDialCode={dialCode}
          onSelect={handleCountryChange}
        />

        <div className="relative flex-1">
          <input
            type="text"
            value={nationalNumber}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-10 px-3.5 rounded-lg bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#c5a059] placeholder-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* Real-time formatted Tel link preview */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11px]">
        {previewTel ? (
          <span className="font-mono text-emerald-400/90 flex items-center gap-1">
            <span className="text-slate-500">Dial Link:</span> {previewTel}
          </span>
        ) : (
          <span className="text-slate-500 font-mono text-[10px]">
            Enter phone number to generate dial link
          </span>
        )}
        {helperText && <span className="text-[10px] text-slate-400">{helperText}</span>}
      </div>
    </div>
  );
};
