import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import CodeBlock from '../Chapter/CodeBlock';
import ColorPicker from '../Controls/ColorPicker';
import SliderControl from '../Controls/SliderControl';
import FontSelector from '../Controls/FontSelector';
import SelectControl from '../Controls/SelectControl';
import CssEditor from './CssEditor';
import HtmlPreview from './HtmlPreview';

const buildKey = (control) => `${control.selector}.${control.property}`;

const formatControlValue = (control, rawValue) => {
  if (control.type === 'slider') {
    return `${rawValue}${control.unit || ''}`;
  }

  return rawValue;
};

const createDefaultValues = (controls = []) =>
  controls.reduce((acc, control) => {
    if (control.type === 'editor') return acc;
    acc[buildKey(control)] = control.defaultValue;
    return acc;
  }, {});

function LivePanel({ panel, mode = 'concept', onValuesChange }) {
  const hasFreeEditor = panel.controls?.some((control) => control.type === 'editor');
  const defaultValues = useMemo(() => createDefaultValues(panel.controls), [panel.controls]);
  const [controlValues, setControlValues] = useState(defaultValues);
  const [freeCss, setFreeCss] = useState(panel.initialCss);

  useEffect(() => {
    setControlValues(defaultValues);
    setFreeCss(panel.initialCss);
  }, [defaultValues, panel.initialCss]);

  const generatedCss = useMemo(() => {
    if (hasFreeEditor) return freeCss;

    const declarations = panel.controls
      .filter((control) => control.type !== 'editor')
      .map((control) => {
        const key = buildKey(control);
        const rawValue = controlValues[key];
        return `${control.selector} { ${control.property}: ${formatControlValue(control, rawValue)}; }`;
      })
      .join('\n');

    return `${panel.initialCss}\n\n${declarations}`.trim();
  }, [controlValues, freeCss, hasFreeEditor, panel.controls, panel.initialCss]);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(controlValues, generatedCss);
    }
  }, [controlValues, generatedCss, onValuesChange]);

  const handleControlChange = useCallback((control, nextValue) => {
    setControlValues((current) => ({
      ...current,
      [buildKey(control)]: nextValue,
    }));
  }, []);

  const resetPanel = () => {
    setControlValues(defaultValues);
    setFreeCss(panel.initialCss);
  };

  return (
    <div className="grid gap-5 rounded-[30px] bg-violet-50/80 p-4 shadow-soft xl:grid-cols-[1.02fr_0.98fr]">
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">
              {mode === 'exercise' ? 'Painel do exercicio' : 'Painel ao vivo'}
            </p>
            <h4 className="text-xl font-black text-ink">Mude o CSS e veja agora</h4>
          </div>
          <button className="subtle-button px-3" onClick={resetPanel}>
            <RotateCcw size={16} />
            Resetar
          </button>
        </div>

        {hasFreeEditor ? (
          <CssEditor value={freeCss} onChange={setFreeCss} />
        ) : (
          <>
            <CodeBlock code={generatedCss} language="css" label="CSS atual" />
            <div className="grid gap-3 md:grid-cols-2">
              {panel.controls.map((control) => {
                if (control.type === 'editor') return null;

                const value = controlValues[buildKey(control)];

                if (control.type === 'color') {
                  return (
                    <ColorPicker
                      key={buildKey(control)}
                      label={control.label}
                      value={value}
                      onChange={(nextValue) => handleControlChange(control, nextValue)}
                    />
                  );
                }

                if (control.type === 'slider') {
                  return (
                    <SliderControl
                      key={buildKey(control)}
                      label={control.label}
                      value={value}
                      min={control.min}
                      max={control.max}
                      step={control.step}
                      unit={control.unit}
                      onChange={(nextValue) => handleControlChange(control, nextValue)}
                    />
                  );
                }

                if (control.type === 'font') {
                  return (
                    <FontSelector
                      key={buildKey(control)}
                      label={control.label}
                      value={value}
                      options={control.options}
                      onChange={(nextValue) => handleControlChange(control, nextValue)}
                    />
                  );
                }

                if (control.type === 'toggle') {
                  return (
                    <SelectControl
                      key={buildKey(control)}
                      label={control.label}
                      value={value}
                      options={[control.inactiveValue, control.activeValue]}
                      onChange={(nextValue) => handleControlChange(control, nextValue)}
                    />
                  );
                }

                return (
                  <SelectControl
                    key={buildKey(control)}
                    label={control.label}
                    value={value}
                    options={control.options}
                    onChange={(nextValue) => handleControlChange(control, nextValue)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      <HtmlPreview htmlContent={panel.baseHtml} cssContent={generatedCss} />
    </div>
  );
}

LivePanel.propTypes = {
  panel: PropTypes.object.isRequired,
  mode: PropTypes.string,
  onValuesChange: PropTypes.func,
};

export default LivePanel;
