import {toast} from 'react-hot-toast'
import {Button, CompWrapper, ToolTip} from 'src/app/common'
import {Dropdown} from 'src/app/common'
import {Menu} from 'src/app/common'
import {HStack, VStack, ResponsiveStack} from 'src/app/common'
import {Table} from 'src/app/common'
import {Skeleton} from 'src/app/common'
import {Title} from 'src/app/common/title/title.common'
// import {CompWrapper} from 'src/app/components'
// import {TextEditor} from 'src/common/textEditor'

export const Sample = () => {
  return (
    <>
      <h2>TextEditor</h2>
      {/* <TextEditor /> */}
      <br />

      <h2>Skeleton</h2>
      <Skeleton width={100} height={100} />
      <Title pageheading>Page Heading</Title>
      <Title>heading</Title>
      <Title subheading>Sub Heading</Title>
      <Title smallheading>Small Heading</Title>

      <h2>Table</h2>
      <TableComponent />

      <h2>Tooltip</h2>
      <HStack gap="$2" wrap>
        <ToolTip text="tooltip text">
          <Button color="primary">BOTTOM LEFT</Button>
        </ToolTip>
      </HStack>

      <h2>Toast</h2>
      <Button color="success" onClick={() => toast.success('Some message')}>
        Open Toast
      </Button>

      <h2>Modal</h2>

      <h2>Menu</h2>
      {/* <Menu.Container trigger={() => <Button color="secondary">Open Menu</Button>}>
        <MenuItem onClick={() => false}>First Element</MenuItem>
        <MenuItem onClick={() => false}>Second Element</MenuItem>
        <MenuSeparator />
        <MenuItem onClick={() => false} danger>
          Third Element
        </MenuItem>
      </Menu> */}

      <h2>Dropdown</h2>

      <Dropdown
        triggerToggle
        trigger={() => <Button>Open Custom Dropdown</Button>}
      >
        <Menu.Container>
          <Menu.Item onClick={() => false}>First Element</Menu.Item>
          <Menu.Item onClick={() => false}>Second Element</Menu.Item>
          <Menu.Separator />
          <Menu.Item onClick={() => false} danger>
            Third Element
          </Menu.Item>
        </Menu.Container>
      </Dropdown>

      <h2>HStack</h2>

      <HStack style={{backgroundColor: 'yellow'}}>
        <div style={{background: 'red', color: 'white'}}>HStack Item 1</div>
        <div style={{background: 'blue', color: 'white'}}>HStack Item 2</div>
        <div style={{background: 'green', color: 'white'}}>HStack Item 3</div>
      </HStack>

      <h2>VStack</h2>
      <VStack style={{backgroundColor: 'orange'}}>
        <div style={{background: 'red', color: 'white'}}>VStack Item 1</div>
        <div style={{background: 'blue', color: 'white'}}>VStack Item 2</div>
        <div style={{background: 'green', color: 'white'}}>VStack Item 3</div>
      </VStack>

      <ResponsiveStack
        style={{backgroundColor: 'yellow', padding: 2}}
        gap="$0_5"
      >
        <div style={{flex: 1, height: 200, backgroundColor: 'green'}}>
          HStack Item 1
        </div>
        <div style={{flex: 1, height: 200, backgroundColor: 'red'}}>
          HStack Item 2
        </div>
      </ResponsiveStack>

      <h2>Tabs</h2>
    </>
  )
}

const TableComponent = () => {
  return (
    <Table
      columns={[
        {
          field: 'name',
          name: 'Name'
        },
        {
          field: 'age',
          name: 'Age',
          render: (data) => <div>{data}</div>
        },
        {
          field: 'address',
          name: 'Address',
          render: ({line1}) => <div>Address: {line1}</div>
        }
      ]}
      data={Array(5)
        .fill({
          name: 'Dipesh',
          age: 100,
          address: {
            line1: 'abc',
            line2: 'cde'
          }
        })
        .map((d) => d)}
      loading={false}
      actions={{
        onEdit: (data) => {},
        onView: (data) => {},
        onDelete: (data) => {}
      }}
      pagination={{
        perPage: 5,
        totalCount: 20
      }}
    />
  )
}
