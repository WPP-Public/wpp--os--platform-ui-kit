import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from 'src/components'

export default {
  title: 'Design System/Components/Navigation/Sidebar',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    argTypes: {
      nativeLink: { control: { type: 'boolean' } },
      withLogo: { control: { type: 'boolean' } },
      target: {
        control: { type: 'text' },
        description: 'Specifies where to open the linked document. For example: _blank, _self, _parent, _top, etc.',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '_self' },
        },
      },
      activePath: {
        control: { type: 'text' },
        description: `
          The \`activePath\` property sets the currently active path in the sidebar.
          You can input any valid path that matches the \`path\` property of the sidebar items.
          Examples include:
          - \`/dashboard\` - Highlights the "Dashboard" item.
          - \`/projects\` - Highlights the "Projects" parent item and keeps it expanded.
          - \`/projects1\` - Highlights the "Projects 01" sub-item under "Projects".
          - Invalid values will have no effect and will not change the active item.
        `,
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '/dashboard' },
        },
      },
    },
  },
} as Meta<Components.WppNavSidebar>

const Sidebar: StoryObj<Components.WppNavSidebar & { withLogo: boolean; target: string }> = {
  render: args => html`
    <div style="width: 100%; height: 100%; padding: 10px;">
      <div
        style="display: flex; flex-direction: column; transition: 0.5s ease-in-out; margin-left: 240px; background-color: var(--wpp-grey-color-300); padding: 20px"
      >
        <wpp-nav-sidebar-v3-2-0
          .applicationName=${'App Name'}
          .activePath=${args.activePath}
          .nativeLink=${args.nativeLink}
        >
          <div slot="header" style="display: flex; flex-direction: column;">
            <div
              style="${`display: ${
                args.withLogo ? 'inline-block' : 'none'
              }; box-shadow: 0 2px 5px rgb(0 0 0 / 20%); width: 40px; height: 40px; border-radius: 6px;`}"
            ></div>
            <wpp-typography-v3-2-0 type="m-strong" style="margin-top: 8px;">App Name</wpp-typography-v3-2-0>
          </div>
          <wpp-nav-sidebar-item-v3-2-0 .label=${'Dashboard'} path=${'/dashboard'} target=${args.target}>
            <wpp-icon-globe-v3-2-0 slot="icon-start"></wpp-icon-globe-v3-2-0>
          </wpp-nav-sidebar-item-v3-2-0>
          <wpp-nav-sidebar-item-v3-2-0 .label=${'Projects'} path=${'/projects'} .extended=${true}>
            <wpp-icon-favorites-v3-2-0 slot="icon-start"></wpp-icon-favorites-v3-2-0>
            <wpp-nav-sidebar-item-v3-2-0
              .label=${'Projects 01'}
              path=${'/project1'}
              target=${args.target}
            ></wpp-nav-sidebar-item-v3-2-0>
            <wpp-nav-sidebar-item-v3-2-0
              .label=${'Projects 02'}
              path=${'/project2'}
              target=${args.target}
            ></wpp-nav-sidebar-item-v3-2-0>
            <wpp-nav-sidebar-item-v3-2-0
              .label=${'Projects 03'}
              path=${'/project3'}
              target=${args.target}
            ></wpp-nav-sidebar-item-v3-2-0>
            <wpp-nav-sidebar-item-v3-2-0
              .label=${'Projects 04'}
              path=${'/project4'}
              target=${args.target}
            ></wpp-nav-sidebar-item-v3-2-0>
          </wpp-nav-sidebar-item-v3-2-0>
          <wpp-nav-sidebar-item-v3-2-0
            .label=${'Scheduled reporting'}
            .extended=${true}
            .expanded=${true}
            .groupTitle=${'Reporting'}
            path=${'/scheduled'}
          >
            <wpp-icon-calendar-v3-2-0 slot="icon-start"></wpp-icon-calendar-v3-2-0>
            <wpp-nav-sidebar-item-v3-2-0 .label=${'Scheduled 01'} path=${'/scheduled1'}></wpp-nav-sidebar-item-v3-2-0>
            <wpp-nav-sidebar-item-v3-2-0 .label=${'Scheduled 02'} path=${'/scheduled2'}></wpp-nav-sidebar-item-v3-2-0>
          </wpp-nav-sidebar-item-v3-2-0>
          <wpp-nav-sidebar-item-v3-2-0 .label=${'Shared reports'} path=${'/shared-reports'} .divide=${true}>
          </wpp-nav-sidebar-item-v3-2-0>
          <wpp-nav-sidebar-item-v3-2-0 .label=${'Attachments'} path=${'/attachments'}>
            <wpp-icon-mail-v3-2-0 slot="icon-start"></wpp-icon-mail-v3-2-0>
          </wpp-nav-sidebar-item-v3-2-0>
          <wpp-nav-sidebar-item-v3-2-0 .label=${'Archive'} path=${'/archive'} .divide=${true}>
            <wpp-icon-subscribe-v3-2-0 slot="icon-start"></wpp-icon-subscribe-v3-2-0>
          </wpp-nav-sidebar-item-v3-2-0>
          <wpp-nav-sidebar-item-v3-2-0 .label=${'Applications'} path=${'/applications'}>
            <wpp-icon-upload-v3-2-0 slot="icon-start"></wpp-icon-upload-v3-2-0>
          </wpp-nav-sidebar-item-v3-2-0>
        </wpp-nav-sidebar-v3-2-0>
        <wpp-typography-v3-2-0>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac. Consequat mauris nunc congue
          nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
          integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
          volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
          odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque
          non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et.
          Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend.
          Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis
          orci a. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac. Consequat mauris nunc congue
          nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
          integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
          volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
          odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque
          non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et.
          Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend.
          Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis
          orci a. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac. Consequat mauris nunc congue
          nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
          integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
          volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
          odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque
          non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et.
          Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend.
          Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis
          orci a. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac. Consequat mauris nunc congue
          nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
          integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
          volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
          odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque
          non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et.
          Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend.
          Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis
          orci a. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
          <br />
          <br />
        </wpp-typography-v3-2-0>

        <wpp-typography-v3-2-0>Valid paths for activePath:</wpp-typography-v3-2-0>
        <li><wpp-typography-v3-2-0>/dashboard</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/projects</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/project1</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/project2</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/project3</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/project4</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/scheduled</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/scheduled1</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/scheduled2</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/shared-reports</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/attachments</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/archive</wpp-typography-v3-2-0></li>
        <li><wpp-typography-v3-2-0>/applications</wpp-typography-v3-2-0></li>
        <br />
      </div>
    </div>
  `,
}

export const NoLogo = {
  ...Sidebar,
  args: {
    nativeLink: true,
    withLogo: false,
    activePath: '/dashboard',
    target: '_blank',
  },
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['withLogo'] },
  },
}

export const WithLogo = {
  ...Sidebar,
  args: {
    nativeLink: true,
    withLogo: true,
    activePath: '/dashboard',
    target: '_blank',
  },
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['withLogo'] },
  },
}
