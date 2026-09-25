import React, { useState, useEffect } from 'react';
import { CountryCodeDropdown } from './CountryCodeDropdown';
import {
  parsePhoneNumberParts,
  buildWhatsAppLink,
  buildWhatsAppDigits
} from '../../data/countryCodes';
import { MessageCircle } from 'lucide-react';

interface InternationalWhatsAppInputProps {
  value: string;
  onChange: (cleanDigits: string, fullLink: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
}

export const InternationalWhatsAppInput: React.FC<InternationalWhatsAppInputProps> = ({
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
    const digits = buildWhatsAppDigits(newCode, nationalNumber);
    const link = buildWhatsAppLink(newCode, nationalNumber);
    onChange(digits, link);
  };

  const handleNumberChange = (num: string) => {
    setNationalNumber(num);
    const digits = buildWhatsAppDigits(dialCode, num);
    const link = buildWhatsAppLink(dialCode, num);
    onChange(digits, link);
  };

  const previewLink = buildWhatsAppLink(dialCode, nationalNumber);

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="font-mono text-slate-200 text-xs flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>{label}</span>
        </label>
      )}

      {/* Input Group: [https://wa.me/] [Country Code Dropdown] [Number Input] */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Fixed Default Prefix https://wa.me/ (no typing needed) */}
        <div className="flex items-center px-2.5 sm:px-3 h-10 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] font-mono text-[11px] sm:text-xs font-semibold select-none shrink-0">
          https://wa.me/
        </div>

        {/* 230+ Country Code Dropdown */}
        <CountryCodeDropdown
          selectedDialCode={dialCode}
          onSelect={handleCountryChange}
        />

        {/* National / Mobile Number Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={nationalNumber}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-10 px-3.5 rounded-lg bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#25D366] placeholder-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* Real-time formatted WhatsApp Link Preview */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11px]">
        {previewLink ? (
          <span className="font-mono text-[#25D366] flex items-center gap-1">
            <span className="text-slate-500">Live URL:</span> {previewLink}
          </span>
        ) : (
          <span className="text-slate-500 font-mono text-[10px]">
            Enter phone number to generate instant WhatsApp link
          </span>
        )}
        {helperText && <span className="text-[10px] text-slate-400">{helperText}</span>}
      </div>
    </div>
  );
};
