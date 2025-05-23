import { useEffect, useRef} from 'react';
import Konva from 'konva';
import { Rect, Transformer } from 'react-konva';
import { useTagContext } from '@/context/TagToolContext';
import { Rectangle } from '@/types';


interface TagProps {
  tagProps: Rectangle,
  isSelected: boolean,
  onSelect: () => void,
  onChange: ( value : Rectangle) => void,
}

export default function Tag ({ tagProps, isSelected, onSelect, onChange }: TagProps) {
  const shapeRef = useRef<Konva.Rect | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const {edit} = useTagContext()

  useEffect(() => {
    const transformer = transformerRef.current;
    const shape = shapeRef.current
    if (isSelected && transformer && shape) {
      // we need to attach transformer manually
      transformer.nodes([shape]);
      transformer.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  function handleTransformEnd() {
    //transform changes scale
    const shape = shapeRef.current;
    if (shape) {
      const scaleX = shape.scaleX();
      const scaleY = shape.scaleY();

      // reset it back
      shape.scaleX(1);
      shape.scaleY(1);

      // and save changes
      onChange({
        ...tagProps,
        x: shape.x(),
        y: shape.y(),
        // set minimal value
        width: Math.max(50, shape.width() * scaleX),
        height: Math.max(50, shape.height() * scaleY),
      });
    }
  }

  return (
    <>
      <Rect
        className= 'tag'
        onMouseDown={onSelect}
        ref={shapeRef}
        fill='transparent'
        {...tagProps}
        draggable = {edit}
        onDragEnd={(e) => {
          onChange({
            ...tagProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
