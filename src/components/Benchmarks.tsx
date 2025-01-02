import { Tabs } from "nextra/components";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface BenchmarkData {
  release: string;
  note?: string;
  metrics: {
    vqa: number;
    gqa: number;
    textVqa?: number;
    docVqa?: number;
    tallyQa: string;
    pope?: string;
    naturalBench?: number;
  };
}

const model2bData: BenchmarkData[] = [
  {
    release: "2024-08-26",
    note: "latest",
    metrics: {
      vqa: 80.3,
      gqa: 64.3,
      textVqa: 65.2,
      docVqa: 70.5,
      tallyQa: "82.6 / 77.6",
      pope: "89.6 / 88.8 / 87.2"
    }
  },
  // ...more historical data...
];

const model05bData: BenchmarkData[] = [
  {
    release: "2024-04-12",
    note: "latest",
    metrics: {
      vqa: 68.92,
      gqa: 57.24,
      tallyQa: "71.82 / 67.91",
      pope: "85.1 / 79.43 / 77.53",
      naturalBench: 44.9
    }
  }
];

const BenchmarkTable = ({ data, type }: { data: BenchmarkData[], type: '2b' | '0.5b' }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`rounded-lg border ${
      isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    } p-6 mt-6`}>
      <div className='overflow-x-auto -mx-6 px-6' style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className={type === '2b' ? 'min-w-[800px]' : ''}>
          <table className='w-full'>
            <thead>
              <tr className={`border-b-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Release</th>
                <th className={`text-right py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>VQAv2</th>
                <th className={`text-right py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>GQA</th>
                {type === '2b' && (
                  <>
                    <th className={`text-right py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>TextVQA</th>
                    <th className={`text-right py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>DocVQA</th>
                  </>
                )}
                <th className={`text-right py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>TallyQA</th>
                <th className={`text-right py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>POPE</th>
                {type === '0.5b' && (
                  <th className={`text-right py-2 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Natural Bench</th>
                )}
              </tr>
            </thead>
            <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {data.map((row) => (
                <tr key={row.release} className={`border-b ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                } ${row.note === 'latest' ? isDark ? 'bg-green-900/20' : 'bg-green-50' : ''}`}>
                  <td className='py-3 px-4'>
                    <div className='font-medium'>{row.release}</div>
                    {row.note && <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{row.note}</div>}
                  </td>
                  <td className='text-right py-3 px-4 font-mono'>{row.metrics.vqa}</td>
                  <td className='text-right py-3 px-4 font-mono'>{row.metrics.gqa}</td>
                  {type === '2b' && (
                    <>
                      <td className='text-right py-3 px-4 font-mono'>{row.metrics.textVqa || '-'}</td>
                      <td className='text-right py-3 px-4 font-mono'>{row.metrics.docVqa || '-'}</td>
                    </>
                  )}
                  <td className='text-right py-3 px-4 font-mono'>{row.metrics.tallyQa}</td>
                  <td className='text-right py-3 px-4 font-mono'>{row.metrics.pope || '-'}</td>
                  {type === '0.5b' && (
                    <td className='text-right py-3 px-4 font-mono'>{row.metrics.naturalBench || '-'}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BenchmarkDetails type={type} isDark={isDark} />
    </div>
  );
};

const BenchmarkDetails = ({ type, isDark }: { type: '2b' | '0.5b', isDark: boolean }) => (
  <div className={`mt-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
    <h4 className='font-medium mb-2'>Benchmark Details:</h4>
    <ul className='space-y-1 list-disc pl-4'>
      <li>
        <span className='font-medium'>VQAv2</span>: Visual Question Answering v2 dataset - General visual reasoning
      </li>
      <li>
        <span className='font-medium'>GQA</span>: Grounded Question Answering - Compositional visual reasoning
      </li>
      {type === '2b' && (
        <>
          <li>
            <span className='font-medium'>TextVQA</span>: Text Visual Question Answering - Reading text in images
          </li>
          <li>
            <span className='font-medium'>DocVQA</span>: Document Visual Question Answering - Understanding documents
          </li>
        </>
      )}
      <li>
        <span className='font-medium'>TallyQA</span>: Counting questions (simple vs. full complexity) - Object counting
      </li>
      <li>
        <span className='font-medium'>POPE</span>: Popular Objects in Common Environment - Object presence verification (random/popular/adversarial)
      </li>
      {type === '0.5b' && (
        <li>
          <span className='font-medium'>Natural Bench</span>: Evaluation on natural adversarial samples requiring diverse visio-linguistic skills
        </li>
      )}
    </ul>
  </div>
);

export default function Benchmarks() {
  return (
    <Tabs items={['2B Models', '0.5B Models']}>
      <Tabs.Tab>
        <BenchmarkTable data={model2bData} type="2b" />
      </Tabs.Tab>
      <Tabs.Tab>
        <BenchmarkTable data={model05bData} type="0.5b" />
      </Tabs.Tab>
    </Tabs>
  );
}
